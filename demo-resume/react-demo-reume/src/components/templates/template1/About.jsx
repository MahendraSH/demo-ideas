import React from "react";

const About = () => {
  return (
    <>
      <div
        className=" min-h-screen bg-gradient-to-tr from-slate-300 via-fuchsia-50 to-cyan-100 w-full "
        id="about"
      >
        <div className="hero min-h-screen ">
          <div className="hero-content flex-col lg:flex-row-reverse lg:pt-10 w-full">
            <div className="card bg-gradient-to-tr from-slate-300 via-fuchsia-50 to-cyan-100">
              <img
                //   src="https://avatars.githubusercontent.com/u/88196283?v=4"
                src="https://res.cloudinary.com/dranaclni/image/upload/v1690273086/IMG-20230305-WA0000-PhotoRoom_w5r90c.png"
                className="  max-w-xs rounded-lg shadow-2xl  card-body block"
              />
            </div>
            <div className="min-w-96 w-3/6 sm:w-full">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
              aperiam blanditiis maiores, iusto amet tempora, molestias rerum
              dolores exercitationem numquam repellat in illo eligendi voluptas
              illum debitis excepturi molestiae! Sequi. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Rerum quo a iste enim ipsam,
              facilis quis aliquid laboriosam, necessitatibus error dolores
              soluta consequatur quas repudiandae ipsa, deserunt voluptatibus
              sit obcaecati dolore aperiam! Necessitatibus aliquam voluptatum
              sit quidem, labore, illo cupiditate vitae nesciunt tempore esse id
              laudantium? Amet culpa soluta labore possimus inventore illo
              consectetur voluptate repellendus maxime vel ea nobis, nam esse.
              Ea doloribus commodi ad impedit totam illo harum dolore veritatis
              rem dignissimos voluptas odit velit tenetur atque provident
              delectus eligendi expedita eaque, consequuntur et a perferendis.
              Harum eaque tempora veritatis aperiam incidunt aspernatur fugit
              asperiores minima rerum pariatur!
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
