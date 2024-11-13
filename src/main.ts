import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import specific icons */
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';

/* add icons to the library */
library.add(faTrash);
library.add(faPen);
library.add(faLock);

// localStorage.setItem('collection', `[{"id":"d1e8e8a2-5e85-4b5d-b25c-9ed6c9401e94","name":"Book Collections","items":[{"id":"f0e65ad2-1d32-4c58-8c96-9d3f9b1d7b54","name":"The Catcher in the Rye","completed":false},{"id":"bc5f2134-46c9-42af-8bd8-c4e2ff35f4c4","name":"To Kill a Mockingbird","completed":true},{"id":"a5d84c16-674e-4d1b-9013-1de49fcd7a7e","name":"1984","completed":false}]},{"id":"2b9a9a4f-3b4b-4ad2-84f1-3ad94e0a93af","name":"Movie Collection","items":[{"id":"c3f81dd0-33b2-4891-8df1-1f44dd0c2d7e","name":"Inception","completed":true},{"id":"d23c7ed1-41d4-432d-9406-15c5ec4b2b65","name":"The Matrix","completed":false},{"id":"f91b8a73-2cb5-4f42-885f-4e4e53b9b314","name":"Interstellar","completed":false}]},{"id":"ac7e9e9f-627d-46c8-bb5a-6a4f3e8a6b3f","name":"Travel Destinations","items":[{"id":"e1d3a816-0e8f-4b9d-9356-8bd0ed24d7a4","name":"Paris","completed":true},{"id":"b9f2c8e2-5478-4398-a829-7ef48d82b9a2","name":"Tokyo","completed":false},{"id":"afbe9a5f-3262-420b-b382-df92d9f0b7d3","name":"New York","completed":true}]}]`);