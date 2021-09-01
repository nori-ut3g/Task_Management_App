class Task{
    constructor(sectionID) {
        this.sectionID = sectionID;//int
        this.taskName = "";//string
        this.contents = "";//string
        this.isFavorite = false;//bool
        this.isComplete = false;
    }

    setTaskName(taskName){
        this.taskName = taskName;
    }
    setContents(contents){
        this.contents = contents;
    }
    switchFavorite(){
        this.isFavorite = this.isFavorite === false;
    }
    switchComplete(){
        this.isComplete = this.isComplete === false;
    }

    getSectionID(){
        return this.sectionID;
    }
    getTaskName(){
        return this.taskName;
    }
    getContents(){
        return this.contents;
    }

}



let taskCardComponent = {
    props:{
        taskCard: {
            type: Object,
            default:() => {
                let defaultTask = new Task(0);
                defaultTask.setTaskName("sampleTask");
                defaultTask.setContents("texttexttext");
                return defaultTask;
            },
        }
    },

    computed:{
        taskName(){
            return this.taskCard.getTaskName();
        },
        taskContents(){
            return this.taskCard.getContents();
        },
        favoriteStarColor(){
            return this.taskCard.isFavorite ? "yellow" : "";
        }

    },
    methods:{
        switchFavorite(){
            this.taskCard.switchFavorite();
        },
        switchComplete(){
            this.taskCard.switchComplete();
        }
    },
    template: `

            <v-card
                    elevation="5"
                    tile
                     max-width="374"
            >
                <v-card-title>{{taskName}}</v-card-title>
                
                <v-card-text>
                    {{taskContents}}
                </v-card-text>
                <v-icon @click="switchComplete"> mdi-check-bold</v-icon>
                <v-icon @click="switchFavorite" :color="favoriteStarColor"> mdi-star</v-icon>
                <v-icon> mdi-delete</v-icon>
                
            </v-card>`

}

let sectionComponent = {
    props:{
        section: {
            type: Object,
            default:() => {
                let defaultSection = new Section(0,"sampleSection");
                return defaultSection;
            },
        }
    },

    computed:{
        tasks(){
            return this.section.getTasksList();
        }
    },
    components:{
        "task-card":taskCardComponent,
    },
    template: `
    <v-app>
        <v-main>
            <v-container>
                <div v-for="task in tasks">
                    <task-card  :task="task"></task-card>
                </div>
            </v-container>
        </v-main>
    </v-app>`

}

class Section{
    constructor(sectionID, sectionName){
        this.sectionID = sectionID;//int
        this.sectionName = sectionName;//string
        this.tasks = [];//[Task]

        this.createTask();
        this.createTask();
        this.createTask();
    }

    createTask(){
        this.tasks.push(new Task(this.sectionID));
    }

    getTasksList(){
        return this.tasks;
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

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
    },
    components:{
        "task-card":taskCardComponent,
        "task-section":sectionComponent
    }
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
