import Service from '@ember/service';

export default Service.extend({
    getBooks(search) {
        let queryParams = '';
        if (search) {
            queryParams=`?q=${search}`;
        }
        return fetch(`http://localhost:3000/books${queryParams}`).then((response) => response.json());
    },
    getBook(id){
        return fetch(`http://localhost:3000/books/${id}`).then((response) => response.json());
    },
    deleteBook(id){
        return fetch(`http://localhost:3000/books/${id}`, { method: 'DELETE'});
    },
    createBook(book){
        return fetch(`http://localhost:3000/books`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
    },
    editBook(book){
        return fetch(`http://localhost:3000/books/${book.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
    },
    getBooksByTag(tag){
        return fetch(`http://localhost:3000/books?tags_like=${tag}`).then((response) => response.json());
    },
    getSpeakers(search) {
        let queryParams = '';
        if (search) {
            queryParams=`?q=${search}`;
        }
        return fetch(`http://localhost:3000/speakers${queryParams}`).then((response) => response.json());
    },
    getSpeaker(id){
        return fetch(`http://localhost:3000/speakers/${id}`).then((response) => response.json());
    },
    deleteSpeaker(id){
        return fetch(`http://localhost:3000/speakers/${id}`, { method: 'DELETE'});
    },
    createSpeaker(speaker){
        return fetch(`http://localhost:3000/speakers`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(speaker)
        });
    },
    editSpeaker(speaker){
        return fetch(`http://localhost:3000/speakers/${speaker.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(speaker)
        });
    }
});
