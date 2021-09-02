class Task{
    constructor(sectionName) {
        this.sectionName = sectionName;//int
        this.taskName = "";//string
        this.contents = "";//string
        this.isFavorite = false;//bool
        this.isComplete = false;//bool
        this.UUID = uuidv4();
    }
    setTaskName(taskName){
        this.taskName = taskName;
    }
    setContents(contents){
        this.contents = contents;
    }
    setSectionName(sectionName){
        this.sectionName = sectionName;
    }
    getSectionName(){
        return this.sectionName;
    }
    getTaskName(){
        return this.taskName;
    }
    getContents(){
        return this.contents;
    }
    switchFavorite(){
        this.isFavorite = this.isFavorite === false;
    }
    switchComplete(){
        this.isComplete = this.isComplete === false;
    }
    getUUID(){
        return this.UUID;
    }
}

class Section{
    constructor(sectionName,sectionID){
        this.sectionID = sectionID;//int
        this.sectionName = "";//string
        this.taskNumber = 0;
        this.tasks = [];//[Task]

        this.createTask();
    }
    getTasksList(){
        return this.tasks;
    }
    getSectionName(){
        return this.sectionName;
    }
    getAllTasksList(){
        //時間があれば実装
    }
    getActiveTasksList(){
        //時間があれば実装
    }

    createTask(){
        this.tasks.push(new Task(this.sectionName, this.taskNumber));
        this.taskNumber++;
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
    getSectionList(){
        return this.sections;
    }    createSection(sectionName){
        this.sections.push(new Section(sectionName,this.numberingID));
        this.numberingID++;
    }
}

//*******************************************************************************************//
//For Component
let taskCardComponent = {
    props:{
        taskCard: {
            type: Object,
            default:() => {
                let defaultTask = new Task(0);
                defaultTask.setTaskName("error");
                return defaultTask;
            },
        }
    },
    data:function(){
        return{
            isTaskNameFieldFocus:false,
            isTaskContentsFieldFocus:false
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
        },
        sectionName(){
            return this.taskCard.getSectionName();
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
            this.$emit("delete-btn-click", this.taskCard);
        },
        taskNameFieldDbClick(){
            this.isTaskNameFieldFocus = true;
        },
        taskContentsFieldDbClick(){
            this.isTaskContentsFieldFocus = true;
        },
        taskNameFieldOutFocus(){
            this.isTaskNameFieldFocus = false;
        },
        taskContentsFieldOutFocus(){
            this.isTaskContentsFieldFocus = false;
        },
        taskNameFieldOnEnter(event){
            if (event.keyCode !== 13) return;
            this.taskNameFieldOutFocus();
        },
        taskContentsFieldOnEnter(event){
            if (event.keyCode !== 13) return;
            this.taskContentsFieldOutFocus();
        },
    },
    template: `
        <v-card
            elevation="3"
            tile
            width="200"
        >
            <v-container>
                <div>
                    <v-text-field 
                        v-if="isTaskNameFieldFocus"
                        @blur="taskNameFieldOutFocus"
                        :value="taskName"
                        elevation="3"
                        autofocus
                        @keydown.enter="taskNameFieldOnEnter"
                        width="180"
                        v-model="taskCard.taskName"
                    ></v-text-field>
                    <v-card
                        v-else
                        solo
                        v-on:dblclick="taskNameFieldDbClick"
                        tile
                        width="180"
                        min-height="30"
                        class="my-2"
                    >
                        <strong>{{taskName}}</strong>
                    </v-card>     
                </div>
                <v-card-subtitle>Section Name: {{sectionName}}</v-card-subtitle>
                <div>
                    <v-textarea 
                        outlined
                        v-if="isTaskContentsFieldFocus"
                        @blur="taskContentsFieldOutFocus"
                        :value="taskContents"
                        @keydown.enter="taskContentsFieldOnEnter"
                        v-model="taskCard.contents"
                    ></v-textarea>
                    <v-card-text
                        v-else
                        v-on:dblclick="taskContentsFieldDbClick"
                    >{{taskContents}}
                    </v-card-text>   
                </div>      
                <div class="text-right">
                    <v-icon @click="taskContentsFieldDbClick"> mdi-note </v-icon>
                    <v-icon @click="switchComplete"> mdi-check-bold</v-icon>
                    <v-icon @click="switchFavorite" :color="favoriteStarColor"> mdi-star</v-icon>
                    <v-icon @click="deleteTask"> mdi-delete</v-icon>
                </div>       
            </v-container>
        </v-card>`
}

let sectionComponent = {
    props:{
        taskSection: {
            type: Object,
            default:() => {
                let defaultSection = new Section("error",0);
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
        onEnter(event){
            if (event.keyCode !== 13) return;
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
                min-height="25"
                class="my-2"
            >
                {{sectionName}}
            </v-card>
            <draggable :list="tasks" group="task-app-tasks" animation="150" :="refreshSectionName">
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
            <div class="d-flex flex-row overflow-auto py-2">
                <draggable :list="sections" group="task-app-sections" animation="150" class="d-flex flex-row">
                            <div v-for="(section, index) in sections" :key="index" class="mx-2">
                                <v-card>
                                    <v-container>
                                        <task-section :taskSection="section" class="mx-2"></task-section>
                                    </v-container>
                                </v-card>
                            </div>        
                </draggable>    
                <v-btn @click="createSection" class="my-2">add section</v-btn>
            </div>         
        </v-main>
    </v-app>`
}

new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    data: {
    },
    components:{
        "task-management-app":taskManagementAppComponent,
    }
})

