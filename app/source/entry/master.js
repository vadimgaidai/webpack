
import '../blocks/index'


let __svg__  = { path: './app/public/svg/!**!/!*.svg', name: 'sprite/sprite.svg' };

require('webpack-svgstore-plugin/src/helpers/svgxhr')(__svg__);

