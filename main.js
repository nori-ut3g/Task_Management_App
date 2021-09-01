class Task{
    constructor(sectionID) {
        this.sectionID = sectionID;//int
        this.taskName = "";//string
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
                     max-width="374"
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

    methods:{
        createTask(){
            this.section.createTask();
        },
        deleteTask(targetTask){
            this.section.deleteTask(targetTask)
        }
    },
    components:{
        "task-card":taskCardComponent
    },
    template: `
    <v-app>
        <v-main>
            <v-container>
                <div v-for="task in tasks">
                    <task-card  :taskCard="task" @delete-btn-click="deleteTask" class="my-2"></task-card>
                </div>
                <v-icon @click="createTask">mdi-plus</v-icon>
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
        console.log(targetTask.getUUID())
        console.log(this.tasks[0].getUUID())

        this.tasks = this.tasks.filter(task => task.getUUID() !== targetTask.getUUID());
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
        "task-section":sectionComponent
    }
})

