class Task{
    constructor(sectionID) {
        this.sectionID = sectionID;//int
        this.taskName = "";//string
        this.contens = "";//string
        this.isFavorite = false;//bool
    }

    setTaskName(taskName){
        this.taskName = taskName;
    }
    setContents(contents){
        this.contens = contents;
    }
    changeFavorite(){
        this.isFavorite = this.isFavorite === false;
    }

    getSectionID(){
        return this.sectionID;
    }
    getTaskName(){
        return this.taskName;
    }
    getContents(){
        return this.contens;
    }
    getIsFavorite(){
        return this.isFavorite;
    }

}

let sampleTask = new Task(1);
sampleTask.setTaskName("sampleTask");
sampleTask.setContents("これはさんぷるですよ")

Vue.component("task-card", {
    // props: ['sectionid'],

    template: `
    <v-app>
        <v-main>
            <v-container>
                    <v-card
                            elevation="5"
                            tile
                             max-width="374"
                    >
                        <v-card-title>Sample</v-card-title>
                        
                        <v-card-text>
                            texttexttexttexttexttexttexttexttext
                        </v-card-text>
                    </v-card>
            </v-container>
        </v-main>
    </v-app>`
});


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
Vue.component("task-section", {
    // props: ['sectionid'],


});


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

new Vue({
    el: '#app',
    vuetify: new Vuetify()
})
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
