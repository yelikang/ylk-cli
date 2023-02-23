const HtmlWebpackPlugin = require('html-webpack-plugin');

class ExtendHtmlWebpackPlugin extends HtmlWebpackPlugin{

    apply(){
        console.log('66666666666666666666666666')
    }

}

module.exports = ExtendHtmlWebpackPlugin