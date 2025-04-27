export type TPosts = Array<{
  id: string;
  title: string;
  location: string;
  date: Date;
  quote: string;
  image: string;
  content: string;
}>;

export const posts: TPosts = [
  {
    id: "1",
    title: "Sidney and Matilda",
    location: "Sheffield",
    date: new Date("2025-04-24"),
    quote: "Sounds alright that.",
    image:
      "https://images.squarespace-cdn.com/content/v1/5e5cee1f6fe14d05ec395f4f/6b26cad1-da31-4f1c-85bc-491f77cbb4aa/S%26M+Vector+Logo-03.png?format=1500w",
    content: "We loaded up the van like usual, but something felt different — Sheffield was calling. The drive was full of laughter, passionate talks about the music we love, and a few bad jokes thrown in for good measure. The venue had some seriously decent beer flowing, and before we knew it, we were swapping stories and gearing up to hit the stage. We played our hearts out to a crowd of real fans — the kind that sing every word back to you. It was one of those nights you wish could go on forever. FAfter the final chord rang out, we packed up, grabbed a last drink, and hit the road home — tired, buzzing, and already looking forward to the next one.",
  },
  {
    id: "2",
    title: "Met Lounge",
    location: "Peterborough",
    date: new Date("2025-04-25"),
    quote: "The show was too short. You have so many great tracks.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmo_K-p_RriibyAQkUOwbXa6XsPFE88QJHWw&s",
    content:
      "The show was too short. You have so many great tracks. The show was too short. You have so many great tracks. The show was too short. You have so many great tracks. The show was too short. You have so many great tracks",
  },
  {
    id: "3",
    title: "Cafe Indie",
    location: "Scunthorpe",
    date: new Date("2025-04-26"),
    quote: "The bass sounds lovely.",
    image:
      "https://cafeindie.org.uk/wp-content/uploads/2021/05/IMG_20210512_145937-01-scaled-e1620832732233-2000x1158.jpeg",
    content: "The show was too short. You have so many great tracks",
  },
  {
    id: "4",
    title: "Hertford Corn Exchange",
    location: "Hertford",
    date: new Date("2025-04-27"),
    quote: "What a pleasure to work with.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3TTom_nPK8gz0WdE2CV-vrAyVXAnRQF8udw&s",
    content: "The show was too short. You have so many great tracks",
  },
];
