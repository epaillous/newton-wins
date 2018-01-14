import * as React from 'react';
import { SuggestionType } from '../../models/suggestionType';
import Chair from '../icons/chair.icon.component';
import Globe from '../icons/globe.icon.component';
import Hotdog from '../icons/hotDog.icon.component';
import Polaroid from '../icons/polaroid.icon.component';
import Scubbadiver from '../icons/scubbaDiver.icon.component';
import './suggestionTypeIcon.component.css';

interface SuggestionTypeIconProps {
  type: SuggestionType | undefined;
}

const SuggestionTypeIcon = (props: SuggestionTypeIconProps) => {
  if (!props.type) {
    return null;
  }
  switch (props.type.id) {
    case 1:
      return <Chair/>;
    case 2:
      return <Hotdog/>;
    case 3:
      return <Polaroid/>;
    case 4:
      return <Scubbadiver/>;
    case 5:
      return <Globe/>;
    default:
      return null;
  }
};

export default (props: SuggestionTypeIconProps) => {
  return (
    <div className="option-icon">
      <SuggestionTypeIcon type={props.type}/>
    </div>
  );
};
