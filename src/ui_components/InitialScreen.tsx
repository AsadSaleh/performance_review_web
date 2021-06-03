import React from "react";

export default function InitialScreen() {
  return (
    <div>
      <div>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">
          This is a simple hero unit, a simple Jumbotron-style component for
          calling extra attention to featured content or information.
        </p>
        <hr className="my-2" />
        <p>
          It uses utility classes for typography and spacing to space content
          out within the larger div.
        </p>
        <p className="lead">
          <button>Learn More</button>
        </p>
      </div>
    </div>
  );
}
