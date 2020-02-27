
var countEven = 0;
var countOrder = 1;
var ValueToStartCount = "";
var StateRobot= "STOPED";
var NumbersToStart = 8;
var TimeToWait = 8000;
var MaxMartinGail = 2;

var target = document.querySelector( '#value' );
var observer = new MutationObserver( handleMutationObserver );
var config = { childList: true, attributes: true };
var dataAtual = new Date()  
var dataAnterior = new Date()

function StartRobot(){
    RobotRun();
}

function RestartRobot(){
    StateRobot = "RESTARTING"
    RobotRun();
}


function handleMutationObserver( mutations ) {

    console.log("valor obtido = " +GetValue("value"))
    console.log("é PAR = " + !Odd(GetValue("value")))
    if (!Odd(GetValue("value"))) {countEven++}
    else{countEven =0}
    console.log("QTD DE número Seguidos Start = " + NumbersToStart)
    console.log("QTD de Pares Seguidos = " + countEven)
        dataAtual =new Date() 
    console.log( "Valor Atual = " + $('#'+"value").text() + "| Tempo anterior " +  dataAnterior+ " | " +" data atual " + dataAtual + "| Tempo calculado"+ (dataAnterior - dataAtual) );
dataAnterior = dataAtual
    if(countEven>=NumbersToStart){
        StateRobot = "BUYING"
        console.log("clicando botao " + countOrder)
    }
    RobotRun();
}



function RobotRun(){
    console.log(StateRobot);
    switch (StateRobot) {
      case 'STOPED':
        console.log('The Robot STOPED');
        StateRobot= "VALIDATING"
        RobotRun();
        break;
      case 'WAITING_OPORTUNITY':


        observer.observe( target, config );

        break;
      case 'BUYING':

        if (Odd(GetValue("value"))){
            console.log(GetValue("value"))
            setTimeout(function(){closeTabs()},TimeToWait)
            setTimeout(function(){RestartRobot()},6000)
            observer.disconnect()
        }
        else if(countOrder <= MaxMartinGail+1){
            ClicaButton(countOrder)
            countOrder++;
            StateRobot = "BUYING"
            console.log("comprou")
        }
        else{
            StateRobot = "ERROR";
            observer.disconnect()
        }
        break;
        case 'STOPPING':
        console.log("parando")
            countEven = 0;
            countOrder = 1;
            StateRobot= "ERROR"
            ValueToStartCount = "";
           observer.disconnect()
        break;
        case 'VALIDATING':
            var CountpurchaseMartinGailButton = 0 ;
            for(i = 1; i <= MaxMartinGail; i++){
              
                if(ValidaID("b"+(i+1))) {
                  
                  CountpurchaseMartinGailButton++}
            }
            
            if(
                countEven == 0 &&
                countOrder == 1 &&
                MaxMartinGail > 0 &&
                ValueToStartCount == "" &&
                ValidaID("b1") &&
                CountpurchaseMartinGailButton == MaxMartinGail
            ) StateRobot= "VALIDATED";
            else StateRobot ="ERROR";
            RobotRun();
        break;
        case 'VALIDATED':
            StateRobot= "ADJUTINGTIME";
            console.log('The Robot VALIDATED');
            RobotRun();
        break
        case 'ADJUTINGTIME':
            setTimeout(()=>{
                if (ValueToStartCount=="") GetValue("value");
                if(ValueToStartCount != GetValue("value")) {
                    StateRobot= "WAITING_OPORTUNITY";
                }
                RobotRun();   
            },10)
        break 
        case 'ERROR':
             console.log('The Robot ERROR');
             observer.disconnect()
        break
        case 'RESTARTING':
                countEven = 0;
                countOrder = 1;
                StateRobot= "STOPED"
                ValueToStartCount = "";
                console.log('The Robot Restarted');
                RobotRun()
         break
    }
}

function ClicaID(id){
  console.log("clicando "+id);
  $('#'+id).click()
}
function ValidaID(id){ return $('#'+id).length? true:  false;}
function GetValue(id){return $('#'+id).text().slice(-1)}
function Odd(value){return parseInt(value)%2==0?false:true}
function ClicaButton(n){
  console.log("b"+n);
  ClicaID("b"+n)}

function closeTabs() {
    var divs = document.querySelectorAll('.close.secondary-bg-color'); 

    for (i = 0; i < divs.length; ++i) {
        divs[i].click();
    };
    RobotRun()
}

RobotRun()







// //  mutations.forEach(function(mutation) {
//     dataAtual =new Date() 
//     console.log( "Valor Atual = " + $('#'+"value").text() + "| Tempo anterior " +  dataAnterior+ " | " +" data atual " + dataAtual + "| Tempo calculado"+ (dataAnterior - dataAtual) );
// dataAnterior = dataAtual
// //  });
  
//observer.observe( target, config );
//StateRobot= "ERROR"