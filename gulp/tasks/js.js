import webpack from 'webpack-stream';

export const js = () => {
    return app.gulp.src(app.path.src.js, {sourcemaps: app.isDev})
                .pipe(app.plugins.plumber(
                    app.plugins.notify.onError({
                        title: "JS",
                        messege: "Error: <%+ error.messege %>"
                    })
                ))
                .pipe(webpack({
                    mode: app.isBuild ? 'production' : 'development',

                    output: {
                        filename: 'main.es5.js',
                    },
                    module: {
                        rules: [{
                          test: /\.m?js$/,
                          use: {
                            loader: 'babel-loader',
                            options: {
                              presets: [
                                ['@babel/preset-env', {
                                  modules: 'auto',
                                  useBuiltIns: 'entry',
                                  "corejs": 3,
                                  targets: {
                                    browsers: [
                                      '> 1%',
                                      'last 2 versions',
                                      'Firefox ESR',
                                    ],
                                  },
                                }],
                              ],
                            },
                          },
                        }],
                    }
                }))
                .pipe(app.gulp.dest(app.path.build.js))
                .pipe(webpack({
                    mode: app.isBuild ? 'production' : 'development',
                    output: {
                        filename: 'main.mjs',
                    },
                    module: {
                        rules: [{
                          test: /\.m?js$/,
                          use: {
                            loader: 'babel-loader',
                            options: {
                              presets: [
                                ['@babel/preset-env', {
                                  modules: 'auto',
                                  useBuiltIns: 'entry',
                                  "corejs": 3,
                                  targets: {
                                    browsers: [
                                      'Chrome >= 60',
                                      'Safari >= 10.1',
                                      'iOS >= 10.3',
                                      'Firefox >= 54',
                                      'Edge >= 15',
                                    ],
                                  },
                                }],
                              ],
                            },
                          },
                        }],
                    },
                }))
                .pipe(app.gulp.dest(app.path.build.js))
                .pipe(app.plugins.browsersync.stream());
}












// import webpack from 'webpack-stream';


// export const js = () => {
//     return app.gulp.src(app.path.src.js, {sourcemaps: true})
//                 .pipe(app.plugins.plumber(
//                     app.plugins.notify.onError({
//                         title: "JS",
//                         messege: "Error: <%+ error.messege %>"
//                     })
//                 ))
//                 .pipe(webpack({
//                     mode: 'development',
//                     output: {
//                         filename: 'app.min.js'
//                     }
//                 }))
//                 .pipe(app.gulp.dest(app.path.build.js))
//                 .pipe(app.plugins.browsersync.stream());
// }