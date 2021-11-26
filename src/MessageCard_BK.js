 <Form>
		<Form.Group ControlId="message.editorTextarea">
		  <Form.Control as="textarea" />
		</Form.Group>
	  </Form>
	  
	   <form onSubmit={this.onFormSubmit}>
        <input  
          type= "text" 
          name= "message" 
          id= "name"
          value={message} 
          onChange={this.handleChange}/>
		  
        <button type="submit">send</button>
      </form>