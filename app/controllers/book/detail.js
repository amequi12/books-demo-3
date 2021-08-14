import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
        async deleteBook(book) {
            try {
                await book.destroyRecord();
                this.transitionToRoute('book.index');
            }
            catch (e) {
                this.send('error', new Error('Connection failed'));
            }
        }
    }
});
