import Carousel from "./Carousel";
import { skillOrbit } from "../data/content";

export default function Arsenal() {
  return (
    <section id="skills" className="section">
      <span id="arsenal" className="section-anchor-alias" aria-hidden="true" />
      <div className="container">
        <div className="section-head">
          <div className="eyebrow" style={{ marginBottom: 16 }}>Technical Arsenal</div>
          <h2 className="section-title">Tools in <em>active orbit</em></h2>
          <p className="section-sub" style={{ marginTop: 12 }}>
            Explore my technical skill set, including programming languages, frameworks, databases, developer tools, and core software engineering concepts
          </p>
        </div>

        <Carousel
          items={skillOrbit}
          baseWidth={300}
          aspectRatio={1.25}
          effect="tilt"
          indicator="dots"
          frame
          arrows={false}
          loop={false}
          autoplay={false}
          autoplayDelay={3000}
          pauseOnHover={false}
          theme="dark"
          peek={0}
          gap={16}
          radius={12}
          draggable
          round={false}
        />
      </div>
    </section>
  );
}
