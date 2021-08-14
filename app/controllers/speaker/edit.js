import Controller from '@ember/controller';

export default Controller.extend({
    actions: {
      async editSpeaker(speaker) {
        try {
          let speakerModel = this.get('model');
          speakerModel.setProperties(speaker);
          await speakerModel.save();
          this.transitionToRoute('speaker.index');
        }
        catch (e) {
          this.send('error', new Error('Connection failed'));
        }
      }
    }
});
