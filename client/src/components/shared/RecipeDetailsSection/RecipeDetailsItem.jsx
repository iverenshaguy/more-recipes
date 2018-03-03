import React from 'react';
import PropTypes from 'prop-types';

/**
 * @exports
 * Returns Recipe Details Item
 * @param {object} props
 * @returns {JSX} RecipeDetailsItem
 */
const RecipeDetailsItem = ({ section }) => (
  <div className="p-xs-1 px-md-5 pt-3">
    <div className="row">
      <div className="col-xs-12 col-md-4 col-lg-4">
        <h4 className="uppercase">{section.title}</h4>
      </div>
      <div className="col-xs-12 col-md-8 col-lg-8 mr-0 pb-1" id="recipe-details-info">
        {section.info}
      </div>
    </div>
    <hr />
    <div className="text-justify" id={section.id}>
      {section.items.length === 0 &&
        <p className="mb-3">There are no {section.title.toLowerCase()}.</p>}
      {section.items &&
        section.items.map(item => <p className="mb-3" key={item}> {item}</p>)}
    </div>
  </div>
);

RecipeDetailsItem.propTypes = {
  section: PropTypes.shape({
    items: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    info: PropTypes.element
  }).isRequired
};

export default RecipeDetailsItem;
