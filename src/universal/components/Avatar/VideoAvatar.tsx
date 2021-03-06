import {VideoAvatar_teamMember} from '__generated__/VideoAvatar_teamMember.graphql'
import React, {useEffect, useRef} from 'react'
import styled from 'react-emotion'
import {createFragmentContainer, graphql} from 'react-relay'
import AvatarBadge from 'universal/components/AvatarBadge/AvatarBadge'
import {StreamUI} from '../../hooks/useSwarm'
import MediaSwarm from '../../utils/swarm/MediaSwarm'

const AvatarStyle = styled('div')({
  cursor: 'pointer',
  display: 'inline-block',
  height: '100%', // needed to not pancake in firefox
  position: 'relative',
  verticalAlign: 'middle',
  width: '100%'
})

const BadgeBlock = styled('div')({
  height: '25%',
  position: 'absolute',
  right: 0,
  top: 0,
  width: '25%'
})

const BadgeBlockInner = styled('div')({
  height: '14px',
  left: '50%',
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  width: '14px'
})

const Video = styled('video')(({isHidden}: {isHidden: boolean}) => ({
  display: isHidden ? 'none' : undefined,
  borderRadius: '100%',
  height: '100%',
  objectFit: 'cover', // fill will squish it, cover cuts off the edges
  minHeight: '100%', // needed to not pancake in firefox
  transform: 'rotateY(180deg)',
  width: '100%'
}))

const Picture = styled('img')(({isHidden}: {isHidden: boolean}) => ({
  display: isHidden ? 'none' : undefined,
  borderRadius: '100%',
  height: '100%',
  objectFit: 'cover', // fill will squish it, cover cuts off the edges
  minHeight: '100%', // needed to not pancake in firefox
  width: '100%'
}))

interface Props {
  teamMember: VideoAvatar_teamMember
  streamUI: StreamUI | undefined
  swarm: MediaSwarm
  onClick?: () => void
}

const VideoAvatar = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const {
      streamUI,
      teamMember: {isSelf, userId},
      swarm
    } = props
    if (!streamUI) return
    const {hasVideo} = streamUI
    if (hasVideo) {
      const el = videoRef.current!
      const stream = isSelf ? swarm.localStreams.cam.low : swarm.getStream('cam', userId)
      console.log('hasVideo', stream, hasVideo)
      if (el.srcObject !== stream) {
        // conditional is required to remove flickering video on update
        el.srcObject = stream
      }
    }
  })
  const {streamUI, teamMember, onClick} = props
  const {picture, isConnected, isSelf, meetingMember} = teamMember
  const isCheckedIn = meetingMember && meetingMember.isCheckedIn
  const showVideo = streamUI ? streamUI.hasVideo : false
  return (
    <AvatarStyle onClick={onClick}>
      <Picture src={picture} isHidden={showVideo} />
      <Video innerRef={videoRef} isHidden={!showVideo} autoPlay muted={isSelf} />
      <BadgeBlock>
        <BadgeBlockInner>
          <AvatarBadge isCheckedIn={isCheckedIn} isConnected={isConnected || isSelf} />
        </BadgeBlockInner>
      </BadgeBlock>
    </AvatarStyle>
  )
}

export default createFragmentContainer(
  VideoAvatar,
  graphql`
    fragment VideoAvatar_teamMember on TeamMember {
      meetingMember {
        isCheckedIn
      }
      isConnected
      isSelf
      picture
      userId
    }
  `
)
