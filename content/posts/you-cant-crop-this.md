---
title: You can't crop this.
date: 2026-11-07
image: cropped-avatar.svg
imageAlt: Pixel-art Ramon with a crop box drawn over him, its edge cutting his face in half
---

You know the feeling. You crawl out of the sewer of a thousand web searches and git repos, on the hunt for the holy grail, only for it to dawn on you that you have to build the thing your bloody self.

This is the short tale of how I pulled together a passable image cropper, ~~stealing~~ borrowing the best things from other image croppers, getting user feedback and turning it into a public package for others to extend and enjoy without jam-sandwiching backwards compatibility.

Granted, I'd brought a Waitrose shopping list to Aldi. I wanted:

- responsive sizing
- recentring after crop settle
- crop area persistence during rotation, flip
- touch device ready
- canvas resizing on crop handle dragging
- freeform, locked aspect ratio
- other things I didn't think of but will impulse buy

One advantage of frontier LLMs already having chowed down the entire internet is that you can ask them to compare and summarise pretty much anything. Like, hey, Google Photos handles crop, settle and zoom really well, but it needs the crop area interactivity of Cropper.js, and the image boundaries of this other half-built solution. All while diving into the details of trigonometry, running 12 TypeScript workers for no reason and building a local harness for your pixel art game idea.

And if you get Fable to argue with Sol, and then have them both gang up on Copilot, then you get a front row seat to the most cordial and verbose hackday you've probably ever attended. Caffeine free. 

You also get to be the big boss on UX, accessibility, API interfaces and extensibility. Like really play with it all and tweak it so it bakes just right.

<video src="/blog/videos/crop-it-real-good.mp4" width="2382" height="1742" controls playsinline preload="metadata" aria-label="Screen recording of the image cropper in the block editor: dragging, rotating and flipping a crop of a pixel-art street scene"></video>

It's a work in progress, but try it yourself on <a class="button" href="https://playground.wordpress.net/?gutenberg-branch=trunk#%7B%22%24schema%22%3A%22https%3A%2F%2Fplayground.wordpress.net%2Fblueprint-schema.json%22%2C%22landingPage%22%3A%22%2Fwp-admin%2Fpost.php%3Fpost%3D1%26action%3Dedit%22%2C%22login%22%3Atrue%2C%22steps%22%3A%5B%7B%22step%22%3A%22writeFile%22%2C%22path%22%3A%22%2Ftmp%2Fsurfer.jpg%22%2C%22data%22%3A%7B%22resource%22%3A%22url%22%2C%22url%22%3A%22https%3A%2F%2Fpd.w.org%2F2026%2F05%2F7056a0de45ab33a93.30349160-2048x1362.jpg%22%2C%22caption%22%3A%22Downloading%20a%20photo%20to%20crop%22%7D%7D%2C%7B%22step%22%3A%22runPHP%22%2C%22code%22%3A%22%3C%3Fphp%20require_once%20'%2Fwordpress%2Fwp-load.php'%3B%20require_once%20ABSPATH%20.%20'wp-admin%2Fincludes%2Ffile.php'%3B%20require_once%20ABSPATH%20.%20'wp-admin%2Fincludes%2Fmedia.php'%3B%20require_once%20ABSPATH%20.%20'wp-admin%2Fincludes%2Fimage.php'%3B%20wp_set_current_user(%201%20)%3B%20%24alt%20%3D%20'A%20surfer%20in%20a%20black%20wetsuit%20stands%20in%20shallow%20water%2C%20holding%20a%20surfboard'%3B%20%24id%20%3D%20media_handle_sideload(%20array(%20'name'%20%3D%3E%20'surfer.jpg'%2C%20'tmp_name'%20%3D%3E%20'%2Ftmp%2Fsurfer.jpg'%20)%2C%200%20)%3B%20if%20(%20is_wp_error(%20%24id%20)%20)%20%7B%20throw%20new%20Exception(%20%24id-%3Eget_error_message()%20)%3B%20%7D%20update_post_meta(%20%24id%2C%20'_wp_attachment_image_alt'%2C%20%24alt%20)%3B%20%24src%20%3D%20wp_get_attachment_image_url(%20%24id%2C%20'large'%20)%3B%20%24content%20%3D%20'%3C!--%20wp%3Aparagraph%20--%3E%3Cp%3ESelect%20the%20photo%2C%20then%20choose%20Edit%20image%20(the%20crop%20icon)%20in%20the%20block%20toolbar.%3C%2Fp%3E%3C!--%20%2Fwp%3Aparagraph%20--%3E'%20.%20PHP_EOL%20.%20PHP_EOL%20.%20'%3C!--%20wp%3Aimage%20'%20.%20wp_json_encode(%20array(%20'id'%20%3D%3E%20%24id%2C%20'sizeSlug'%20%3D%3E%20'large'%2C%20'linkDestination'%20%3D%3E%20'none'%20)%20)%20.%20'%20--%3E%3Cfigure%20class%3D%5C%22wp-block-image%20size-large%5C%22%3E%3Cimg%20src%3D%5C%22'%20.%20esc_url(%20%24src%20)%20.%20'%5C%22%20alt%3D%5C%22'%20.%20esc_attr(%20%24alt%20)%20.%20'%5C%22%20class%3D%5C%22wp-image-'%20.%20%24id%20.%20'%5C%22%2F%3E%3C%2Ffigure%3E%3C!--%20%2Fwp%3Aimage%20--%3E'%3B%20wp_update_post(%20wp_slash(%20array(%20'ID'%20%3D%3E%201%2C%20'post_title'%20%3D%3E%20'Try%20the%20image%20cropper'%2C%20'post_content'%20%3D%3E%20%24content%20)%20)%20)%3B%20update_user_meta(%201%2C%20%24GLOBALS%5B'wpdb'%5D-%3Eget_blog_prefix()%20.%20'persisted_preferences'%2C%20array(%20'core%2Fedit-post'%20%3D%3E%20array(%20'welcomeGuide'%20%3D%3E%20false%20)%2C%20'_modified'%20%3D%3E%20gmdate(%20'c'%20)%20)%20)%3B%22%7D%5D%7D" data-label="WordPress Playground"><span class="button-front">WordPress Playground</span></a>.