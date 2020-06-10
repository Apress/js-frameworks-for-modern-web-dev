define(['undrln'], function (_) {
  var quoteData = [
    {
      "text": "I love deadlines. I like the whooshing sound they make as they fly by.",
      "attribution": "Douglas Adams"
    },
    {
      "text": "Part of the inhumanity of the computer is that, once it is competently programmed and working smoothly, it is completely honest.",
      "attribution": "Isaac Asimov"
    },
    {
      "text": "Life, faculties, production–in other words, individuality, liberty, property–this is man. And in spite of the cunning of artful political leaders, these three gifts from God precede all human legislation and are superior to it.",
      "attribution": "Frederic Bastiat"
    },
    {
      "text": "...since law cannot operate without the sanction and support of a dominating force, this force must be entrusted to those who make the laws. This fact, combined with the fatal tendency that exists in the heart of man to satisfy his wants with the least possible effort, explains the almost universal perversion of the law. Thus it is easy to understand how law, instead of checking injustice, becomes the invincible weapon of injustice. It is easy to understand why the law is used by the legislator to destroy in varying degrees among the rest of the people, their personal independence by slavery, their liberty by oppression, and their property by plunder. This is done for the benefit of the person who makes the law, and in proportion to the power that he holds.",
      "attribution": "Frederic Bastiat"
    },
    {
      "text": "It’s only those who do nothing that make no mistakes, I suppose.",
      "attribution": "Joseph Conrad"
    },
    {
      "text": "My theory of self-made men is, then, simply this; that they are men of work. Whether or not such men have acquired material, moral or intellectual excellence, honest labor faithfully, steadily and persistently pursued, is the best, if not the only, explanation of their success… All human experience proves over and over again, that any success which comes through meanness, trickery, fraud and dishonour, is but emptiness and will only be a torment to its possessor.",
      "attribution": "Frederick Douglas"
    },
    {
      "text": "The most difficult thing is the decision to act, the rest is merely tenacity. The fears are paper tigers. You can do anything you decide to do. You can act to change and control your life; and the procedure, the process is its own reward.",
      "attribution": "Amelia Earhart"
    },
    {
      "text": "One who fears the future, who fears failure, limits his activities. Failure is only the opportunity to more intelligently begin again. There is no disgrace in honest failure; there is disgrace in fearing to fail.",
      "attribution":  "Henry Ford"
    },
    {
      "text": "A man is a fool not to put everything he has, at any given moment, into what he is creating.",
      "attribution": "Frank Herbert"
    },
    {
      "text": "...the pattern and original of all dictatorship is the surrender of reason to absolutism and the abandonment of critical, objective inquiry.",
      "attribution": "Christopher Hitchens"
    },
    {
      "text": "I find that the harder I work, the more luck I seem to have.",
      "attribution": "Thomas Jefferson"
    },
    {
      "text": "Remembering that I’ll be dead soon is the most important tool I’ve ever encountered to help me make the big choices in life. Because almost everything — all external expectations, all pride, all fear of embarrassment or failure – these things just fall away in the face of death, leaving only what is truly important. Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose. You are already naked. There is no reason not to follow your heart.",
      "attribution": "Steve Jobs"
    },
    {
      "text": "Never ask someone to give up on their dreams just so you can feel more stable. It’s his choice and his choice alone, no matter how ridiculous his dream may seem to you, or to society, or even to himself. Dreams make humans into self-realized individuals. Your only responsibility is to love everything about him, including his dreams. The idea of ‘making this work’ sounds more like a way to make his life more boring and predictable. At worst, it’s a genuine sadistic desire to control someone else because your own life feels out of control — or a cruel need to dominate and break someone’s spirit for the sake of your own peace of mind. Look for stability and peace of mind inside yourself, and not in your relationships or dreams of others.",
      "attribution": "Andrew W. K."
    },
    {
      "text": "Take bacon for example – bacon is the most wonderful food in all of human history and probably will never be displaced from that status. Bacon is crunchy and tasty and fatty and delicious. A salad with bacon is just a game of hide-and-seek the bacon.",
      "attribution": "Athol Kay"
    },
    {
      "text": "Of all tyrannies, a tyranny exercised for the good of its victims may be the most oppressive. It may be better to live under robber barons than under omnipotent moral busybodies. The robber baron’s cruelty may sometimes sleep, his cupidity may at some point be satiated; but those who torment us for our own good will torment us without end, for they do so with the approval of their own conscience.",
      "attribution": "C. S. Lewis"
    },
    {
      "text": "Competition is a by-product of productive work, *not* its goal. A creative man is motivated by the desire to achieve, *not* by the desire to beat others.",
      "attribution": "Ayn Rand"
    },
    {
      "text": "You must be the kind of [person] who can get things done. But to get things done, you must love the doing, not the secondary consequences.",
      "attribution": "Ayn Rand"
    },
    {
      "text": "Do not let your fire go out, spark by irreplaceable spark. In the hopeless swamps of the not quite, the not yet, and the not at all, do not let the hero in your soul perish and leave only frustration for the life you deserved, but never have been able to reach. The world you desire can be won, it exists, it is real, it is possible, it is yours.",
      "attribution": "Ayn Rand"
    },
    {
      "text": "There's no surer way to destroy a man than to force him into a spot where he has to aim at not doing his best.",
      "attribution": "Ayn Rand"
    },
    {
      "text": "Keep away from people who try to belittle your ambitions. Small people always do that, but the really great make you feel that you, too, can become great.",
      "attribution": "Mark Twain"
    },
    {
      "text": "He who accepts life for what it is and never allows himself to be overwhelmed by it does not need to seek refuge for his crushed self-confidence in the solace of a ‘saving lie’.  If the longed-for success is not forthcoming, if the vicissitudes of fate destroy in the twinkling of an eye what had to be painstakingly built up by years of hard work, then he simply multiplies his exertions.  He can look disaster in the eye without despairing.",
      "attribution": "Ludwig von Mises"
    },
    {
      "text": "That which hits the fan tends to get flung in all directions.",
      "attribution": "Larry Wall"
    },
    {
      "text": "There are men in all ages who mean to govern well, but they mean to govern. They promise to be good masters, but they mean to be masters.",
      "attribution": "Daniel Webster"
    },
    {
      "text": "Doing better next time. That’s what life is.",
      "attribution": "Joe Abercrombie"
    },
    {
      "text": "The more you say, the more likely you are to say something foolish.",
      "attribution": "Robert Greene"
    },
    {
      "text": "Education is not a thing apart from life—not a 'system', nor a philosophy; it is direct teaching how to live and how to work.",
      "attribution": "Booker T. Washington"
    },
    {
      "text": "People become, in our minds, what we see them do.",
      "attribution": "Orson Scott Card"
    },
    {
      "text": "...the spontaneous collaboration of free men often creates things which are greater than their individual minds can ever fully comprehend.",
      "attribution": "F. A. Hayek"
    },
    {
      "text": "There is all the difference in the world between treating people equally and attempting to make them equal.",
      "attribution": "F. A. Hayek"
    }
  ];

  return {

    groupByAttribution: function () {
      return _.groupBy(quoteData, 'attribution');
    },

    all: function () {
      return quoteData;
    }
  }
});