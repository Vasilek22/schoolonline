import React from 'react';
import style from './content.module.css'

export default function Content({ selectedNavItem  }) {
  return (
    <div className={style.content}>
      {selectedNavItem === 'item1' && <div>Content for Item 1</div>}

      {selectedNavItem === 'item2' && <div>Content for Item 2</div>}
      
      {selectedNavItem === 'item3' && <div>Content for Item 3</div>}
    </div>
  )
}
