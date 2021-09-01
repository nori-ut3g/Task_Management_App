class Task{
    constructor(sectionName, taskNo) {
        this.sectionName = sectionName;//int
        this.taskName = taskNo//"";//string
        this.contents = "";//string
        this.isFavorite = false;//bool
        this.isComplete = false;
        this.UUID = uuidv4();
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

    getSectionName(){
        return this.sectionName;
    }
    getTaskName(){
        return this.taskName;
    }
    getContents(){
        return "sectionName:" + this.sectionName
        // return this.contents;
    }

    setSectionName(sectionName){
        this.sectionName = sectionName;
    }
    getUUID(){
        return this.UUID;
    }


}
class Section{
    constructor(sectionName,sectionID){
        this.sectionID = sectionID;//int
        this.sectionName = ""//sectionName;//string
        this.taskNumber = 0;
        this.tasks = [];//[Task]

        this.createTask();
    }

    createTask(){
        this.tasks.push(new Task(this.sectionName, this.taskNumber));
        this.taskNumber++;
    }

    getTasksList(){
        return this.tasks;
    }

    getAllTasksList(){

    }
    getActiveTasksList(){

    }

    getSectionName(){
        return this.sectionName;
    }

    deleteTask(targetTask){
        this.tasks = this.tasks.filter(task => task !== targetTask);
    }

    setAllTaskName(){
        this.tasks.forEach(task => task.setSectionName(this.getSectionName()))
    }


}



class TaskManagementApp{
    constructor() {
        this.numberingID = 0;
        this.sections = [];
    }

    createSection(sectionName){
        this.sections.push(new Section(sectionName,this.numberingID));
        this.numberingID++;
    }

    getSectionList(){
        return this.sections;
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
        },
        uuid(){
            return this.taskCard.UUID;
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
    data:function(){
        return{
            isFocus:false
        }

    },

    computed:{
        tasks(){
            return this.taskSection.getTasksList();
        },
        sectionName(){
            return this.taskSection.getSectionName();
        },
        refreshSectionName(){
            this.taskSection.setAllTaskName();
        }

    },



    methods:{
        createTask(){
            this.taskSection.createTask();
        },
        deleteTask(targetTask){
            this.taskSection.deleteTask(targetTask)
        },
        dbClick(){
            this.isFocus = true;
        },
        outFocus(){
            this.isFocus = false;

        },
        changeSectionName(){

        },
        onEnter(event){
            if (event.keyCode !== 13) return
            this.isFocus = false;
        }



    },
    components:{
        "task-card":taskCardComponent,
    },
    template: `
            <div>

                    
            <v-text-field 
                ref="inputSectionName"
                v-if="isFocus"
                @blur="outFocus"
                :value="sectionName"
                elevation="3"
                autofocus
                @keydown.enter="onEnter"
                width="200"
                v-model="taskSection.sectionName"

            ></v-text-field>
            <v-card 
                solo
                v-else
                v-on:dblclick="dbClick"
                elevation="3"
                tile
                width="200"
                height="25"
                class="my-2"
            >
                {{sectionName}}
            </v-card>
            <draggable :list="tasks" group="task-app" animation="150" :="refreshSectionName">
                <div v-for="(task, index) in tasks" :key="index" >
                    <task-card  :taskCard="task" @delete-btn-click="deleteTask" class="my-2" ></task-card>
                </div>
            </draggable>
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
        },
    },
    components:{
        "task-section":sectionComponent,
    },
    template: `
    <v-app>
        <v-main>
            <v-container>
            <v-row>
                <div v-for="(section, index) in sections" :key="index">
                    <task-section :taskSection="section" class="mx-2"></task-section>
                </div>            
                <v-btn @click="createSection" class="my-2">add section</v-btn>
            </v-row>

                    
            </v-container>
        </v-main>
    </v-app>`

}


new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
    },
    components:{
        // draggable: window['vuedraggable'],
        "task-management-app":taskManagementAppComponent,
    }
})

