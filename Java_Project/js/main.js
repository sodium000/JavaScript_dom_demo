const milestonesData = JSON.parse(data).data;

//load course mileston data 
function loadeMilestones() {
    const milestones = document.querySelector(".milestones")

    milestones.innerHTML = `${milestonesData.map(function (milestone) {

        return `<div class="milestone border-b" id="${milestone._id}">
            <div class="flex">
              <div class="checkbox"><input type="checkbox" onclick="markMileStone(this,${milestone._id})"/></div>
              <div onclick = "openMilestone(this, ${milestone._id})">
                <p>
                  ${milestone.name}
                  <span><i class="fas fa-chevron-down"></i></span>
                </p>
              </div>
            </div>
            <div class="hidden_panel">
                ${milestone.modules.map(function (module) {
            return `<div class="module border-b">
                <p>${module.name}</p>
              </div>`
        }).join("")}
              </div>
            </div>
          </div>`;

    }).join("")}`;
}

function openMilestone(milestoneElement, id ) {

    const currentPanal = milestoneElement.parentNode.nextElementSibling;
    const shownPanal = document.querySelector(".show");
    const active = document.querySelector(".active");

    // first remove previous active class if any [other than the clicked one]
    if(active && !milestoneElement.classList.contains("active")){
      active.classList.remove("active");
    }

    // toggle bold the text 
    milestoneElement.classList.toggle("active");

      // condition on dropdown the modules  
    if (!currentPanal.classList.contains("show") && shownPanal ){

        shownPanal.classList.remove("show");

    }
    // toggle dropdown && show hide part

    currentPanal.classList.toggle("show");

    showMilestone(id);

}

function showMilestone(id){

    const milestoneImage = document.querySelector(".milestoneImage");
    const name = document.querySelector(".title");
    const details= document.querySelector(".details");

    milestoneImage.style.opacity = "0";
    milestoneImage.src = milestonesData[id].image;
    name.innerText= milestonesData[id].name;
    details.innerText= milestonesData[id].description;

}

// listen for image load 
const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function(){
  this.style.opacity = "1";
}

function markMileStone(checkbox,id){
  const doneList = document.querySelector(".doneList");
  const milestonList = document.querySelector(".milestones");
  const item = document.getElementById(id)

  if(checkbox.checked){
    // mark as done
    milestonList.removeChild(item);
    doneList.appendChild(item);
    
  }

  else{
   
    milestonList.appendChild(item);
    doneList.removeChild(item);
  }
}
loadeMilestones();