// db.js

export const db = {
    dbInstance: null,
  
    openDB: function(dbName, storeName) {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(dbName, 1);
  
        request.onupgradeneeded = (e) => {
          const db = e.target.result;
          if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: 'username' });
          }
        };
  
        request.onsuccess = (e) => {
          this.dbInstance = e.target.result;
          resolve(this.dbInstance);
        };
  
        request.onerror = (e) => {
          reject('Error al abrir la base de datos: ', e.target.errorCode);
        };
      });
    },
  

    /**
     * Create a new user in the db
     * @param {nameDB} storeName 
     * @param {user} user 
     * @returns 
     */
    saveUser: function(storeName, user) {
      return new Promise((resolve, reject) => {
        const transaction = this.dbInstance.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.add(user);
  
        request.onsuccess = () => resolve('Usuario guardado con éxito');
        request.onerror = (e) => reject('Error al guardar usuario: ', e.target.errorCode);
      });
    },
  

    /**
     * Get a user with a specific username
     * @param {nameDB} storeName 
     * @param {username} username 
     * @returns 
     */
    getUser: function(storeName, username) {
      return new Promise((resolve, reject) => {
        const transaction = this.dbInstance.transaction([storeName]);
        const store = transaction.objectStore(storeName);
        const request = store.get(username);
  
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject('Error al cargar usuario: ', e.target.errorCode);
      });
    },

    /**
     * Update a user with a specific username
     * @param {nameDB} storeName 
     * @param {user} user 
     * @returns 
     */
    updateUser: function(storeName, user) {
      return new Promise((resolve, reject) => {
        const transaction = this.dbInstance.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(user);
  
        request.onsuccess = () => resolve('Usuario actualizado con éxito');
        request.onerror = (e) => reject('Error al actualizar usuario: ', e.target.errorCode);
      });
    },

    /**
     * Clean the store of the db
     * @param {nameDB} storeName 
     * @returns 
     */
    clearStore: function(storeName) {
      return new Promise((resolve, reject) => {
        const transaction = this.dbInstance.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.clear();
  
        request.onsuccess = () => resolve('Todos los registros eliminados con éxito');
        request.onerror = (e) => reject('Error al eliminar registros: ', e.target.errorCode);
      });
    },

    /**
     * Get all users from db
     * @param {nameDB} storeName 
     * @returns 
     */
    getAllUsers: function(storeName) {
      return new Promise((resolve, reject) => {
        const transaction = this.dbInstance.transaction([storeName]);
        const store = transaction.objectStore(storeName);
        const request = store.getAll();
    
        request.onsuccess = (e) => resolve(e.target.result);
        request.onerror = (e) => reject('Error al cargar todos los usuarios: ', e.target.errorCode);
      });
    }

  };
  