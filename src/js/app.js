//import "../css/style.css"

const Web3 = require('web3');
const contract = require('@truffle/contract');

const votingArtifacts = require('../../build/contracts/Voting.json');
var VotingContract = contract(votingArtifacts)


window.App = {
  eventStart: function() { 
    window.ethereum.request({ method: 'eth_requestAccounts' });
    VotingContract.setProvider(window.ethereum)
    VotingContract.defaults({from: window.ethereum.selectedAddress,gas:6654755})

    // Load account data
    App.account = window.ethereum.selectedAddress;
    $("#accountAddress").html("Your Account: " + window.ethereum.selectedAddress);
    VotingContract.deployed().then(function(instance){
     instance.getCountCandidates().then(function(countCandidates){

            $(document).ready(function(){
              $('#addCandidate').click(function() {
                  var nameCandidate = $('#name').val();
                  var partyCandidate = $('#party').val();
                  instance.addCandidate(nameCandidate, partyCandidate, { from: window.ethereum.selectedAddress })
                  .then(function(result){ })

            });   
              $('#addDate').click(function(){             
                const startInput = document.getElementById("startDate").value; // e.g., "05/15/2025"
                const endInput = document.getElementById("endDate").value;
                
                // Use US-style date parsing safely
                const [startYear, startMonth, startDay ] = startInput.split("-");
                const [endYear,endMonth, endDay] = endInput.split("-");
                
                const stDate = Math.floor(new Date(`${startYear}-${startMonth}-${startDay}T24:00:00Z`).getTime()/1000);
                const endDate = Math.floor(new Date(`${endYear}-${endMonth}-${endDay}T24:00:00Z`).getTime()/1000);
                
                const [year, month, day] = startInput.split("-").map(Number);
                const startDateUTC = new Date(Date.UTC(year, month - 1, day+1));  // month is 0-indexed
                startDateUTC.setHours(0, 0, 0, 0);
                // Get today's date at UTC midnight
                const now = new Date();
                const todayUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
                todayUTC.setHours(0, 0, 0, 0);
                if(startDateUTC<todayUTC){
                  alert("error");
                  return;
                }
           
                  instance.setDates(stDate,endDate,{ from: window.ethereum.selectedAddress }).then(function(rslt){ 
                    
                  }).catch(function (err) {
                    console.error("Contract reverted:", err.message);
                    if (err.data && err.data.message) {
                        console.error("Revert reason:", err.data.message);
                    }
                });

              });     

               instance.getDates().then(function(result){
                var startDate = new Date(result[0]*1000);
                var endDate = new Date(result[1]*1000);

                $("#dates").text( startDate.toDateString(("#DD#/#MM#/#YYYY#")) + " - " + endDate.toDateString("#DD#/#MM#/#YYYY#"));
              }).catch(function(err){ 
                console.error("ERROR! " + err.message)
              });           
          });
             
          for (var i = 0; i < countCandidates; i++ ){
            instance.getCandidate(i+1).then(function(data){
              var id = data[0];
              var name = data[1];
              var party = data[2];
              var voteCount = data[3];
              var viewCandidates = `<tr><td> <input class="form-check-input" type="radio" name="candidate" value="${id}" id=${id}>` + name + "</td><td>" + party + "</td><td>" + voteCount + "</td></tr>"
              $("#boxCandidate").append(viewCandidates)
            })
        }
        
        window.countCandidates = countCandidates 
      });

      instance.checkVote().then(function (voted) {
          console.log(voted);
          if(!voted)  {
            $("#voteButton").attr("disabled", false);

          }
      });

    }).catch(function(err){ 
      console.error("ERROR! " + err.message)
    })
  },

  vote: function() {    
    var candidateID = $("input[name='candidate']:checked").val();
    if (!candidateID) {
      $("#msg").html("<p>Please vote for a candidate.</p>")
      return
    }
    VotingContract.deployed().then(function(instance){
      instance.vote(parseInt(candidateID)).then(function(result){
        $("#voteButton").attr("disabled", true);
        $("#msg").html("<p>Voted</p>");
         window.location.reload(1);
      })
    }).catch(function(err){ 
      console.error("ERROR! " + err.message)
    })
  }
}

window.addEventListener("load", function() {
  if (typeof web3 !== "undefined") {
    console.warn("Using web3 detected from external source like Metamask")
    window.eth = new Web3(window.ethereum)
  } else {
    console.warn("No web3 detected. Falling back to http://localhost:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for deployment. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
    window.eth = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"))
  }
  window.App.eventStart()
})
