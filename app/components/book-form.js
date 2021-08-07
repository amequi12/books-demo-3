import Component from '@ember/component';

export default Component.extend({
    actions: {
        submitForm(e){
            e.preventDefault();
            this.onsubmit({
                id: this.get('bookId'),
                bookName: this.get('bookName'),
                author: this.get('author'),
                pagesNumber: this.get('pagesNumber'),
                cover: this.get('cover'),
                tags: this.get('tags').toString().split(','),
            });
        }
    },

    didReceiveAttrs() {
        this._super(...arguments);
        this.setProperties({
          bookId: this.get('book.id') ? this.get('book.id') : undefined,
          bookName: this.get('book.bookName'),
          author: this.get('book.author'),
          pagesNumber: this.get('book.pagesNumber'),
          cover: this.get('book.cover'),
          tags: this.get('book.tags')
        });
    }
});
