import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

function HelpModal() {
  const [open, setOpen] = React.useState(true)

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>How To Use CovrLetter.AI</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>1. Paste Your Resume</Header>
          <br></br>
          <Header>2. Paste The Job Description</Header>
          <br></br>
          <Header>3. Edit The Generated Cover Letter</Header>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          content="Got it!"
          labelPosition='right'
          icon='checkmark'
          onClick={() => setOpen(false)}
          positive
        />
      </Modal.Actions>
    </Modal>
  )
}

export default HelpModal
