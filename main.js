class Task{
    constructor(sectionID, taskNo) {
        this.sectionID = sectionID;//int
        this.taskName = taskNo//"";//string
        this.contents = "";//string
        this.isFavorite = false;//bool
        this.isComplete = false;
        this.UUID = uuidv4();
        console.log(this.UUID)
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

    getUUID(){
        return this.UUID;
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
        },
        deleteTask(){
            this.$emit("delete-btn-click", this.taskCard)
        }
    },
    template: `

            <v-card
                    elevation="3"
                    tile
                    width="200"
            >
                <v-card-title>{{taskName}}</v-card-title>
                
                <v-card-text>
                    {{taskContents}}
                </v-card-text>
                <v-icon @click="switchComplete"> mdi-check-bold</v-icon>
                <v-icon @click="switchFavorite" :color="favoriteStarColor"> mdi-star</v-icon>
                <v-icon @click="deleteTask"> mdi-delete</v-icon>
                
            </v-card>`

}

let sectionComponent = {
    props:{
        taskSection: {
            type: Object,
            default:() => {
                let defaultSection = new Section(0,"sampleSection");
                return defaultSection;
            },
        }
    },

    computed:{
        tasks(){
            console.log("fds")
            return this.taskSection.getTasksList();
        }
    },

    methods:{
        createTask(){
            this.taskSection.createTask();
        },
        deleteTask(targetTask){
            this.taskSection.deleteTask(targetTask)
        }
    },
    components:{
        "task-card":taskCardComponent
    },
    template: `
            <div>
                <div v-for="task in tasks">
                    <task-card  :taskCard="task" @delete-btn-click="deleteTask" class="my-2"></task-card>
                </div>
                <v-icon @click="createTask">mdi-plus</v-icon>
            </div>`


}


let taskManagementAppComponent = {
    props:{
        taskManagementApp: {
            type: Object,
            default:() => {
                return new TaskManagementApp();
            },
        }
    },

    computed:{
        sections(){
            return this.taskManagementApp.getSectionList();
        }
    },

    methods:{
        createSection(){
            this.taskManagementApp.createSection();
        }
    },
    components:{
        "task-section":sectionComponent,
    },
    template: `
    <v-app>
        <v-main>
            <v-container>
            <v-row>
                <div v-for="section in sections">
                    <task-section :taskCard="section" class="mx-2"></task-section>
                </div>            
                <v-btn @click="createSection" class="my-2">add section</v-btn>
            </v-row>

                    
            </v-container>
        </v-main>
    </v-app>`

}

class Section{
    constructor(sectionID, sectionName){
        this.sectionID = sectionID;//int
        this.sectionName = sectionName;//string
        this.taskNumber = 0;
        this.tasks = [];//[Task]

        this.createTask();
    }

    createTask(){
        this.tasks.push(new Task(this.sectionID, this.taskNumber));
        this.taskNumber++;
    }

    getTasksList(){
        return this.tasks;
    }

    getAllTasksList(){

    }
    getActiveTasksList(){

    }

    deleteTask(targetTask){
        this.tasks = this.tasks.filter(task => task !== targetTask);
    }


}



class TaskManagementApp{
    constructor() {
        this.numberingID = 0;
        this.sections = [];
    }

    createSection(sectionName){

        this.sections.push(new Section(this.numberingID, sectionName));
        this.numberingID++;
    }

    getSectionList(){
        return this.sections;
    }
}

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
    },
    components:{

        "task-management-app":taskManagementAppComponent
    }
})

