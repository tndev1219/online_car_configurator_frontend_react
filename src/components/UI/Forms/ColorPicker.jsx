import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';

class ColorPicker extends React.Component {
   state = {
      displayColorPicker: false
   };

   handleClick = () => {
      this.setState({ displayColorPicker: !this.state.displayColorPicker })
   };

   handleClose = () => {
      this.setState({ displayColorPicker: false })
   };

   render() {
      const styles = reactCSS({
         'default': {
            popover: {
               position: 'absolute',
               zIndex: '2',
               left: 40
            },
            cover: {
               position: 'fixed',
               top: '0px',
               right: '0px',
               bottom: '0px',
               left: '0px',
            },
         },
      });

      return (
         <div>
            <div onClick={this.handleClick}>
               <img src={require('../../../assets/images/color-picker.jpg')} alt='color-picker' width={100} height={100} />
            </div>
            {this.state.displayColorPicker ? <div style={styles.popover}>
               <div style={styles.cover} onClick={this.handleClose} />
               <SketchPicker
                  color={this.props.color} 
                  disableAlpha={true}
                  onChange={(color) => this.props.handleChange(color.hex, this.props.type)} 
               />
            </div> : null}

         </div>
      )
   }
}

export default ColorPicker