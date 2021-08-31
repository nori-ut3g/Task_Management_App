class Task{
    constructor(sectionID) {
        this.sectionID = sectionID;//int
        this.taskName = "";//string
        this.contens = "";//string
        this.isFavorite = false;//bool
    }

    setContents(contents){

    }
}
Vue.component("task", {

})

class Section{
    constructor(sectionID, sectionName){
        this.sectionID = sectionID;//int
        this.sectionName = sectionName;//string
        this.tasks = [];//[Task]
    }

    createTask(){
        this.tasks.push(new Task(this.sectionID));
    }

}

class SectionList{
    constructor() {
        this.numberingID = 0;
        this.sections = [];
    }

    createSection(sectionName){
        this.numberingID++;
        this.sections.push(new Section(this.numberingID, sectionName));
    }
}

<!--    new Vue({-->
<!--        el: '#app',-->
<!--        vuetify: new Vuetify(),-->
<!--    })-->
// Vue.component('task', {
//     props: ['sectionid'],
//
//     template: `
//     <div class="card m-2" style="width: 18rem;">
//         <div class="card-body">
//         </div>
//     </div>`
// });
// Vue.component('section', {
//     props: ["itemcard"],
//
//     template: `
//     <div class="card m-2" style="width: 18rem;">
//
//     </div>`
// });
