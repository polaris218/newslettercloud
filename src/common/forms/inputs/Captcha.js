import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'

window.recaptchaOptions = {
  lang: 'true',
  useRecaptchaNet: false,
  removeOnUnmount: false,
}

class Captcha extends React.Component{

  constructor(props) {
    super(props)

    this.recaptchaRef = React.createRef()
  }

  onChange = (response) => {
     this.props.input.onChange(response)
  }

  componentDidUpdate(prevProps) {
    if(this.props.value && prevProps.email !== this.props.email) {
      this.recaptchaRef.current.reset()
      this.props.input.onChange(null)
    }
  }
  render() {
    return (
      <div>
        {this.props.meta.touched && this.props.meta.error}
        <ReCAPTCHA
          ref={this.recaptchaRef}
          sitekey={"6LejAJMUAAAAADwwobWdat5HUXL53VeSsUcOawwJ"}
          onChange={this.onChange}
          grecaptcha={window.grecaptchaObject}
        />
      </div>
    )
  }
}

export default Captcha
