fis.hook('relative')
    .match('**',{
        relative:true
    })
    .match('*.less',{
        parser:fis.plugin('less'),
        rExt:'.css',
        useHash:true
    })
    .match('*.scss', {
        parser: fis.plugin('node-sass'),
        rExt: '.css',
        useHash:true
    })
    .match('*.{js,css,png}',{
        useHash:true
    })
    .match('/static/js/*.js',{
        isMod:true
    })
    .hook('commonjs')
    .match('::package',{
        postpackager:fis.plugin('loader',{
            resourceType: 'mod',
            useInlineMap: true,
            allInOne: {
                includeAsyncs: true,
                sourceMap: true,
                useTrack: false
            }
        }),
        packager:fis.plugin('map')
    })


// 清除其他配置，只保留如下配置
fis.media('prod')
    .match('*.js', {
        // fis-optimizer-uglify-js 插件进行压缩，已内置
        optimizer: fis.plugin('uglify-js')
    })
    .match('*.css',{
        // fis-optimizer-clean-css 插件进行压缩，已内置
        optimizer: fis.plugin('clean-css')
    })
    .match('*.png',{
        // fis-optimizer-png-compressor 插件进行压缩，已内置
        optimizer: fis.plugin('png-compressor')
    });