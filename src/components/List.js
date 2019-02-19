import React from 'react';

import { stringToColour } from 'utils.js';

import './List.css';

const Header = ({letter}) => (
  <li className='List__Header' key={letter}>{letter}</li>
);

const Contact = ({name, phone_number, address, expanded, toggleExpanded}) => {
  const initials = name.includes(' ')
    ? name
        .split(' ')
        .slice(0, 2)
        .map(word => word.charAt(0))
        .join('')
    : name
        .charAt(0);
  
  const avatarStyle = {
    backgroundColor: stringToColour(initials)
  };

  return (
    <li className='List__Contact'>
      <i className='List__Contact__Avatar' style={avatarStyle}>{initials}</i>
      <span className='List__Contact__Title'>{name}</span>
      <span className='List__Contact__Subtitle'>{phone_number}</span>
      <i className='List__Contact__Action' onClick={toggleExpanded}>›</i>
      <div className={`List__Contact__Info ${!expanded && 'hidden'}`}>
        <span className='List__Contact__Info__Label'>Address</span>
        <p className='List__Contact__Info__Address'>
          {address}
        </p>
      </div>
    </li>
  )
};

const List = ({
  loading,
  contacts,
  mustGroup,
  expanded,
}) => {
  const renderContacts = () => {
    if(mustGroup) {
      const groups = {};
      contacts.forEach(({name, key, ...contact}) => {
        const props = {
          name,
          key,
          ...contact,
          expanded: expanded.includes(key),
        };

        const initial = name.charAt(0);
        const contactEl = <Contact {...props} />;
        if(initial in groups) {
          groups[initial].push(contactEl);
        } else {
          groups[initial] = [contactEl];
        }
      });

      return Object.keys(groups).map(key => {
        const headerEl = <Header key={key} letter={key} />;
        const items = [
          headerEl,
          ...groups[key],
        ];

        return items;
      });
    } else {
      return contacts.map(({key, ...contact}) => {
        const props = {
          ...contact,
          key,
          expanded: expanded.includes(key),
        };

        const contactEl = <Contact {...props} />;
        return contactEl;
      });
    }
  };

  const renderMessage = () => (
    <div className='List__Message'>
      <i className='List__Message__Icon'>
        {
          loading
          ? <span role='img' aria-label='Loading'>🔄</span>
          : <span role='img' aria-label='Oops'>😅</span>
        }
      </i>
      <p className='List__Message__Text'>
        {
          loading 
          ? 'Loading...'
          : <>This feels <em>a little</em> empty...</>
        }
      </p>
    </div>
  )

  return (
    <ul className='List'>
      {
        contacts.length > 0
        ? renderContacts()
        : renderMessage()
      }
    </ul>
  );
};

export default List;
