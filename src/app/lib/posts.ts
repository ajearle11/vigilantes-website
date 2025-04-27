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
    content: "Today started off as most gigs do.",
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
];
