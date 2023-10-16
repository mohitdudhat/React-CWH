import React from "react";

export const NoteItem = (props) => {
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3" style={{ width: "18rem" }}>
        <img src="..." className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title"> {note.title}</h5>
          <p className="card-text">
            {note.description} Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sed dolore quam nobis sint earum sunt incidunt
            magnam asperiores quos, culpa amet nemo corrupti ratione ad maiores
            unde. Cupiditate vitae quisquam pariatur voluptas, ex obcaecati.
          </p>
          <a href="/" className="btn btn-primary">
            Go somewhere
          </a>
        </div>
      </div>
    </div>
  );
};
