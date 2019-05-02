
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.
var Song = Backbone.Model.extend();

var Songs = Backbone.Collection.extend({
    model: Song
});

var SongView = Backbone.View.extend({
    tagName:'li',
  
    render:function()
    {
        this.$el.html(this.model.get("title"));
        this.$el.attr("id", this.model.id);
        return this;
    }
});

var SongsView = Backbone.View.extend({
      tagName:"ul",
      initialize:function()
    {
      this.model.on("add", this.onAddmodel, this); 
      this.model.on("remove", this.Onremove, this);
    },
    onAddmodel:function(song)
    {
      var songView = new SongView({model:song});
        
        this.$el.append(songView.render().$el);
    },
    Onremove:function(song)
    {
       this.$("li#" + song.id).remove();
    },
    render:function()
    {
        var self = this;
        this.model.each(function(song)
        {
            var songView = new SongView({model:song});
            self.$el.append(songView.render().$el);
        });
    }
});

var songs = new Songs([new Song({id:1,title:"Blue in Green"}),
    new Song({id:2,title:"So What"}),
    new Song({id:3,title:"Is there any problem"}),
    new Song({id:4,title:"With that"})
]);

var songsView = new SongsView({el:"#container", model:songs});
songsView.render();