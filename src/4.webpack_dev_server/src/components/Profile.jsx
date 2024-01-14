import React, { memo} from 'react'

const Profile = memo(() => {
  return (
    <div>
      avatar1: <img src="../../avatar.jpg"/> <br/>
      avatar2: <img src="/avatar.jpg"/>
      <h3>users:</h3>
    </div>
  )
})

export default Profile