import React from "react";
import chase from "../img/chase.png";
import alan from "../img/alan.png";
import preston from "../img/preston.jpg";
import tom from "../img/tom.jpg";

export default function AboutTeam() {
  return (
    <div className="teamBox">
      <div className="member">
        <img src={chase} alt="chase wenner" />
        <h1 className="name">Chase Wenner</h1>
        <h2 className="role">Full Stack</h2>
        <a
          href="https://github.com/chasester"
          className="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        <a href="https://www.linkedin.com/in/chase-wenner-5395b6190/" className="linkedin">
          linkedin
        </a>
      </div>

      <div className="member">
        <img src={alan} alt="alan perez" />
        <h1 className="name">Alan Perez</h1>
        <h2 className="role">Full Stack</h2>
        <a
          href="https://www.linkedin.com/in/alanarturoperez/"
          className="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        <a href="https://www.linkedin.com/in/alanarturoperez/" className="linkedin">
          linkedin
        </a>
      </div>

      <div className="member">
        <img src={preston} alt="preston burton" />
        <h1 className="name">Preston Burton</h1>
        <h2 className="role">Full Stack</h2>
        <a
          href="https://github.com/Oliver-Strange"
          className="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        <a href="https://www.linkedin.com/in/preston-burton-447108186/" className="linkedin">
          linkedin
        </a>
      </div>

      <div className="member">
        <img src={tom} alt="tom higgins" />
        <h1 className="name">Tom Higgins</h1>
        <h2 className="role">Data Science</h2>
        <a
          href="https://github.com/Higgins2718"
          className="github"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
        <a href="https://www.linkedin.com/in/tom-higgins-4b0327123/" className="linkedin">
          linkedin
        </a>
      </div>
    </div>
  );
}
