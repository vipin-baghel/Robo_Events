import React from "react";
import { FaCalendarAlt, FaRegComment } from "react-icons/fa";

const Trending = () => {
  const trendingNews = [
    {
      id: 1,
      headline:
        "IEM ROBO CLUB emerged as the winner in Innovation Contest Open for All at Technoxian 8.0",
      date: "29 August, 2024",
      image:
        "https://futuretech.media/wp-content/uploads/2024/08/IMG_9665-scaled.jpg",
    },
    {
      id: 2,
      headline: "Invincibles Bots Wins BotsCombat 30 Kg at TechnoXian 8.0",
      date: "30 August, 2024",
      image:
        "https://futuretech.media/wp-content/uploads/2024/08/IMG_9280-scaled.jpg",
    },
    {
      id: 3,
      headline: "Karma Yodha RoboSoccer Championship at TechnoXian 8.0",
      date: "30 August, 2024",
      image:
        "https://futuretech.media/wp-content/uploads/2024/08/IMG_9214-scaled.jpg",
    },
    {
      id: 4,
      headline: "Ustm Warrior in BotsCombat 15 Kg at TechnoXian 8.0",
      date: "30 August, 2024",
      image:
        "https://futuretech.media/wp-content/uploads/2024/08/IMG_9242-scaled.jpg",
    },
  ];
  return (
    <section className="lg:w-[40%]">
      <h3 className="uppercase text-md text-[#b70000] font-bold tracking-tighter mb-2">
        Trending News
      </h3>
      <h2 className="text-4xl text-[#222222] tracking-tighter font-bold mb-10">
        Trending News
      </h2>
      <div className="mb-4">
        {trendingNews.slice(0, 1).map((item) => (
          <div
            key={item.id}
            className="rounded-lg max-md:w-full"
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "220px",
              
              position: "relative",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute top-10 left-2 p-4 ">
              <h2 className="text-lg text-white font-medium tracking-tigher tracking-tighter hover:text-[#b70000] mb-2">
                {item.headline}
              </h2>
              <div className="flex items-center gap-2">
                <FaCalendarAlt size={15} className="text-white" />
                <span className="text-md text-white">{item.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <ul className="flex flex-col gap-4">
        {trendingNews.slice(1).map((item) => (
            <li key={item.id} className="border border-gray-300 rounded-lg px-4 py-2 ">
                <h3 className="text-md text-[#222222] tracking-tight mb-1">{item.headline}</h3>
                <div className="flex items-center gap-2">
                <FaCalendarAlt size={15} className="text-gray-500" />
                <span className="text-md text-gray-500">{item.date}</span>
                <FaRegComment size={15} className="ml-4 text-gray-500" />
              </div>
                

            </li>
        ))}
      </ul>
    </section>
  );
};

export default Trending;
