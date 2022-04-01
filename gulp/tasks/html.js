
import fileinclude from "gulp-file-include";
import webpHtmlNosvg from 'gulp-webp-html-nosvg'; // все картинки в webp кроме svg
import versionNumber from 'gulp-version-number'; // добавляет ключ к файлам



export const html = () => {
    return app.gulp.src(app.path.src.html)
                .pipe(app.plugins.plumber(
                    app.plugins.notify.onError({
                        title: "HTML",
                        messege: "Error: <%+ error.messege %>"
                    })
                ))
                .pipe(fileinclude())
                .pipe(app.plugins.replace(/@img\//g, 'img/'))
                // .pipe(webpHtmlNosvg())
                .pipe(
                    app.plugins.if(
                        app.isBuild,
                        webpHtmlNosvg()
                    )
                )
                // .pipe(versionNumber({
                //     'value': '%DT%',
                //     'append': {
                //         'key': '_v',
                //         'cover': 0,
                //         'to': [
                //             'css',
                //             'js',
                //         ]
                //     },
                //     'output': {
                //         'file': 'gulp/version.json'
                //     }
                // }))
                .pipe(
                    app.plugins.if(
                        app.isBuild,
                        versionNumber({
                            'value': '%DT%',
                            'append': {
                                'key': '_v',
                                'cover': 0,
                                'to': [
                                    'css',
                                    'js',
                                ]
                            },
                            'output': {
                                'file': 'gulp/version.json'
                            }
                        })
                    )
                )
                .pipe(app.gulp.dest(app.path.build.html))
                .pipe(app.plugins.browsersync.stream());
}