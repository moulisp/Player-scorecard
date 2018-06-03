import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from '../webpack.config';


new WebpackDevServer(webpack(webpackConfig), {
    contentBase:  "./public",
    stats: {
        assets: true,
        chunks: false,
        colors: true,
        hash: false,
        timings: false,
        version: false
    }
}).listen(8080, 'localhost', () => {
    console.log('listening on localhost:8080')
})