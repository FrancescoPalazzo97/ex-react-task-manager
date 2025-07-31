# 📋 Task Manager Avanzato

## 🎯 Consegna

**Repo:** `ex-react-task-manager`

Sei stato assunto per costruire un **Task Manager Avanzato**, un'app web che permette agli utenti di creare, modificare, organizzare ed eliminare task in modo intuitivo ed efficiente.

L'app dovrà supportare filtri avanzati, ricerca ottimizzata, ordinamento e conferme di azione con modali. Inoltre, dovrà garantire un'esperienza fluida con prestazioni ottimizzate.

---

## 📌 Milestone 1 - Setup e Routing

Clonare il backend del progetto, impostare il frontend con Vite e configurare il routing con react-router-dom.

### 🔧 Setup Backend

Per gestire i task, utilizzeremo un backend già pronto.

1. **Cloniamo il repository:**
   ```bash
   https://github.com/boolean-it/react-task-manager-back
   ```

2. **Avviamo il server:**
   ```bash
   npm install
   npm run start
   ```

3. **Verifichiamo l'avvio:**
   Dopo qualche secondo, nel terminale apparirà un messaggio simile a:
   ```
   ✅ Server in ascolto su http://localhost:3001
   ```
   > Questo URL dovrà essere utilizzato per configurare il frontend.

### 🔧 Setup Frontend

1. **Creiamo il progetto** con Vite
2. **Installiamo** `react-router-dom` nel progetto
3. **Creiamo il router principale** in `App.jsx` utilizzando `BrowserRouter`

### 📄 Pagine Principali

- **Lista dei Task** (`TaskList.jsx`) → mostrerà l'elenco dei task
- **Aggiungi Task** (`AddTask.jsx`) → conterrà il form per aggiungere un nuovo task

### 🧭 Navigazione

- Aggiungere una **barra di navigazione** con `NavLink`
- Definire le **rotte** con `Routes` e `Route`, associando ogni percorso alla rispettiva pagina

---

## 📌 Milestone 2 - Setup Context API e Fetch Iniziale

Creare un contesto globale per la gestione dei dati e recuperare la lista dei task dall'API.

### 🔐 Configurazione Ambiente

1. **Salvare l'URL dell'API** nel file `.env` del progetto frontend
2. Creare un file `.env` nella cartella del progetto frontend
3. Aggiungere lo URL della API raccolto alla Milestone 1

### 🌐 Context API

1. **Creare** un Context API (`GlobalContext`) per gestire lo stato globale
2. **Definire** uno `useState` per memorizzare la lista dei task
3. **Effettuare** una richiesta `GET` a `/tasks` al caricamento dell'app
4. **Stampare** in console i dati ricevuti per verificare il recupero
5. **Rendere disponibile** il `GlobalContext.Provider` in `App.jsx`

---

## 📌 Milestone 3 - Lista dei Task (Pagina)

Visualizzare l'elenco dei task in una tabella e ottimizzare il rendering con `React.memo()`.

### 📊 Struttura Tabella

1. **Recuperare** la lista dei task dal `GlobalContext`
2. **Strutturare** `TaskList.jsx` come una tabella con intestazioni:
   - **Nome**
   - **Stato** 
   - **Data di Creazione**

### 🔧 Componente TaskRow

1. **Creare** `TaskRow.jsx` per rappresentare una singola riga
2. **Mostrare** solo: `title`, `status` e `createdAt` (escludendo `description`)

### 🎨 Stili Status

Applicare colori di sfondo alle celle in base al valore dello stato:

- **"To do"** → `rosso`
- **"Doing"** → `giallo`  
- **"Done"** → `verde`

### ⚡ Ottimizzazione

Utilizzare `React.memo()` su `TaskRow.jsx` per evitare render inutili.

---

## 📌 Milestone 4 - Creazione del Custom Hook useTasks() (GET)

Creare un custom hook per centralizzare la gestione dei task e semplificare l'accesso ai dati.

### 🔗 Hook useTasks()

1. **Creare** `useTasks()` che recupera i task iniziali con `GET` a `/tasks`
2. **Memorizzare** i dati in uno stato locale (`useState`)
3. **Definire** le funzioni (vuote per ora):
   - `addTask`
   - `removeTask`
   - `updateTask`
4. **Restituire** le funzioni e la lista dei task

### 🌐 Integrazione

**Integrare** `useTasks()` nel `GlobalContext` per l'accesso globale.

---

## 📌 Milestone 5 - Creazione del Form per Aggiungere un Task

Creare un form per aggiungere un task, senza ancora inviare i dati all'API.

### 📝 Campi Form

Aggiornare `AddTask.jsx` con:

1. **Nome del task** (`title`) → Input **controllato** (`useState`)
2. **Descrizione** (`description`) → Textarea **non controllata** (`useRef`)
3. **Stato** (`status`) → Select **non controllata** (`useRef`) con:
   - Opzioni: "To do", "Doing", "Done"
   - Valore predefinito: "To do"

### ✅ Validazione

**Validare** il campo Nome (`title`):

- Non può essere **vuoto**
- Non può contenere **simboli speciali**
- Se errato, mostrare **messaggio di errore**

```javascript
const symbols = "!@#$%^&*()-_=+[]{}|;:'\\",.<>?/`~";
```

### 🚀 Gestione Submit

Al click del bottone "Aggiungi Task":
- **SOLO** stampare in console l'oggetto task
- **NON** inviare ancora la richiesta all'API

---

## 📌 Milestone 6 - Integrazione dell'API per Aggiungere un Task (POST)

Collegare il form di AddTask all'API e completare la funzione addTask in useTasks().

### 🔧 Completare addTask

La funzione deve:

1. **Ricevere** un oggetto con `title`, `description` e `status`
2. **Effettuare** chiamata API `POST /tasks`
3. **Inviare** l'oggetto come body in formato JSON

### 📊 Struttura Risposta API

**In caso di successo:**
```json
{ "success": true, "task": /* la task creata */ }
```

**In caso di errore:**
```json
{ "success": false, "message": "Messaggio di errore" }
```

### ⚡ Logica addTask

- Se `success` è `true` → aggiornare lo stato globale
- Se `success` è `false` → lanciare errore con `message`

### 📝 Modifica Submit Form

In `AddTask.jsx`:

- **Eseguire** `addTask` di `useTasks()`
- **Se successo:** alert di conferma + reset form  
- **Se errore:** alert con messaggio di errore

---

## 📌 Milestone 7 - Creazione della Pagina Dettaglio Task

Creare la pagina `TaskDetail.jsx`, che visualizza i dettagli di un task.

### 🔗 Aggiornare TaskRow.jsx

**Rendere** il `title` un link a `/task/:id`

### 🛣️ Aggiornare App.jsx

**Aggiungere** la rotta `/task/:id` che carica `TaskDetail.jsx`

### 📄 Creare TaskDetail.jsx

**Mostrare:**
- **Nome** (`title`)
- **Descrizione** (`description`)  
- **Stato** (`status`)
- **Data di creazione** (`createdAt`)
- **Bottone "Elimina Task"** (per ora solo console.log)

---

## 📌 Milestone 8 - Funzione di Eliminazione Task (DELETE)

Aggiungere la funzionalità di eliminazione di un task con una chiamata API e aggiornare lo stato.

### 🔧 Completare removeTask

La funzione deve:

1. **Ricevere** un `taskId`
2. **Effettuare** chiamata API `DELETE /tasks/:id`

### 📊 Struttura Risposta API

**In caso di successo:**
```json
{ "success": true }
```

**In caso di errore:**
```json
{ "success": false, "message": "Messaggio di errore" }
```

### ⚡ Logica removeTask

- Se `success` è `true` → rimuovere task dallo stato globale
- Se `success` è `false` → lanciare errore con `message`

### 🗑️ Gestione Eliminazione

In `TaskDetail.jsx`:

- **Al click** su "Elimina Task" → chiamare `removeTask`
- **Se successo:** alert di conferma + redirect a `/`
- **Se errore:** alert con messaggio di errore

---

## 📌 Milestone 9 - Componente Modal e Conferma Eliminazione Task

Creare un componente Modal riutilizzabile e utilizzarlo per confermare l'eliminazione di un task.

### 🔧 Componente Modal.jsx

**Props da accettare:**

- `title`: titolo della modale
- `content`: contenuto principale
- `show`: stato booleano per mostrare/nascondere
- `onClose`: funzione per chiudere
- `onConfirm`: funzione eseguita al click conferma
- `confirmText` (opzionale, default "Conferma"): testo bottone

### ⚙️ Implementazione Modal

- **Utilizzare** `ReactDOM.createPortal` per rendering indipendente
- **Implementare** pulsanti "Annulla" e "Conferma"

### 🔗 Integrazione in TaskDetail.jsx

- **Al click** "Elimina Task" → aprire modale di conferma
- **Se confermato** → eseguire operazioni Milestone 8

---

## 📌 Milestone 10 - Modale e Funzione di Modifica Task (PUT)

Creare una modale per modificare i dettagli di un task e aggiornare i dati tramite API.

### 🔧 Completare updateTask

La funzione deve:

1. **Ricevere** un oggetto `updatedTask`
2. **Effettuare** chiamata API `PUT /tasks/:id`

### 📊 Struttura Risposta API

**In caso di successo:**
```json
{ "success": true, "task": /* la task aggiornata */ }
```

**In caso di errore:**
```json
{ "success": false, "message": "Messaggio di errore" }
```

### ⚡ Logica updateTask

- Se `success` è `true` → aggiornare task nello stato globale
- Se `success` è `false` → lanciare errore con `message`

### 🔧 Componente EditTaskModal.jsx

**Props da accettare:**

- `show` (boolean): visibilità modale
- `onClose` (function): funzione chiusura
- `task` (object): task da modificare
- `onSave` (function): funzione chiamata al salvataggio

### 📝 Struttura EditTaskModal

**Utilizzare** componente `Modal` con:

- `title`: "Modifica Task"
- `content`: form con campi task
- `confirmText`: "Salva"
- `onConfirm`: attiva submit del form

### 💡 Gestione Submit Form

**Importante:** Per attivare il submit:

1. **Creare** una ref con `useRef()` e associarla al form
2. **Chiamare** `editFormRef.current.requestSubmit()` al click "Salva"

### 📝 Campi Form

**Form controllato** con:

- **Nome** (`title`) → Input di testo (`useState`)
- **Descrizione** (`description`) → Textarea (`useState`)  
- **Stato** (`status`) → Select (`useState`) con opzioni "To do", "Doing", "Done"

### 🔗 Integrazione in TaskDetail.jsx

**Aggiungere** bottone "Modifica Task":

- **Al click** → aprire modale precompilata
- **onSave** → eseguire `updateTask` di `useTasks()`
- **Se successo:** alert conferma + chiudere modale
- **Se errore:** alert con messaggio errore

---

## 📌 Milestone 11 - Ordinamento delle Task

Implementare un sistema di ordinamento nella tabella delle task, permettendo all'utente di ordinare i task in base a diversi criteri.

### 📊 State di Ordinamento

**Aggiungere** in `TaskList.jsx`:

- `sortBy`: criterio ordinamento (`title`, `status`, `createdAt`)
- `sortOrder`: direzione (1 crescente, -1 decrescente)
- **Default:** `sortBy = "createdAt"`, `sortOrder = 1`

### 🔗 Intestazioni Cliccabili

**Modificare** la tabella per rendere cliccabili le intestazioni (`th`):

- **Se colonna già selezionata** → invertire `sortOrder`
- **Se colonna diversa** → impostare nuovo `sortBy` e `sortOrder = 1`

### ⚡ Logica Ordinamento

**Implementare** con `useMemo()` (ricalcolo solo se cambiano `tasks`, `sortBy` o `sortOrder`):

- **Per `title`** → alfabetico (`localeCompare`)
- **Per `status`** → ordine: "To do" < "Doing" < "Done"
- **Per `createdAt`** → confronto numerico (`.getTime()`)
- **Applicare** `sortOrder` per direzione crescente/decrescente

---

## 📌 Milestone 12 - Ricerca dei Task con Debounce

Aggiungere un campo di ricerca che permette all'utente di filtrare i task in base al nome, ottimizzando le prestazioni con debounce.

### 🔍 Input di Ricerca

**Aggiungere** in `TaskList.jsx`:

- **Input controllato** sopra la tabella
- **Stato** `searchQuery` (`useState`) per il valore

### 🔧 Filtraggio e Ordinamento

**Modificare** `useMemo()` per:

- **Applicare** filtraggio basato su `searchQuery`
- **Ricerca case insensitive**
- **Ordinare** risultati secondo criteri esistenti

### ⚡ Implementare Debounce

1. **Creare** funzione debounce con `setTimeout()`
2. **Usare** `useCallback()` per memorizzare la funzione
3. **Prevenire** ricalcoli inutili

### 💡 Importante

> Il debounce non funziona bene sugli input controllati.
> **Rimuovere** `value` dall'input, rendendolo **non controllato**.

---

## 🎯 BONUS 1 - Selezione ed Eliminazione Multipla di Task

Implementare un sistema di multi-selezione e cancellazione di Task.

### 🔧 Modificare TaskRow.jsx

**Aggiungere props:**

- `checked`: indica se task è selezionata
- `onToggle`: funzione chiamata al click checkbox

**Inserire** checkbox accanto al nome, controllata tramite `checked` e che richiama `onToggle(task.id)`

### 📊 Gestire Stato Selezione

**In `TaskList.jsx`:**

1. **Creare** stato `selectedTaskIds` (`useState([])`)
2. **Creare** funzione `toggleSelection(taskId)` per aggiornare l'array
3. **Passare** a `TaskRow` il `checked` e `toggleSelection` come `onToggle`

### 🗑️ Pulsante Eliminazione Multipla

**Mostrare** "Elimina Selezionate" solo se `selectedTaskIds` contiene almeno un elemento

### 🔧 Implementare removeMultipleTasks

**In `useTasks.js`:**

1. **Ricevere** array di ID
2. **Inviare** più richieste `DELETE /tasks/{id}` in parallelo
3. **Utilizzare** `Promise.allSettled()` per gestire successi ed errori
4. **Per ogni successo** → rimuovere task dallo stato locale
5. **Se almeno un fallimento** → lanciare errore con ID non eliminati

### ⚡ Gestione Eliminazione Multipla

**In `TaskList.jsx`:**

- **Al click** "Elimina Selezionate" → chiamare `removeMultipleTasks`
- **Se successo:** alert conferma + svuotare `selectedTaskIds`
- **Se errore:** alert con messaggio errore

---

## 🎯 BONUS 2 - Funzionalità Aggiuntive

Aggiungere funzionalità di personalizzazione, formattazione, validazione e centralizzazione dello stato.

### 📅 Formattazione Date con dayjs

1. **Installare** dayjs:
   ```bash
   npm install dayjs
   ```

2. **Modificare** `TaskRow.jsx` e `TaskDetail.jsx` per visualizzare date in formato italiano (`DD/MM/YYYY`)

### ✅ Validazione Nomi Duplicati

**Aggiornare** `addTask` e `updateTask` in `useTasks.js`:

- **Prima** della chiamata API → controllare se esiste task con stesso nome
- **Se nome presente** → lanciare errore e impedire creazione/modifica

### 🔧 Implementare useReducer

1. **Sostituire** `useState` con `useReducer` in `useTasks.js`
2. **Creare** `tasksReducer.js` per gestire azioni:
   - `LOAD_TASKS`
   - `ADD_TASK`
   - `REMOVE_TASK`
   - `UPDATE_TASK`
   - `REMOVE_MULTIPLE_TASKS`
3. **Modificare** tutte le funzioni per aggiornare stato tramite reducer