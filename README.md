# Orchestra
Orchestra is a visual language that compiles into RegExp (as for ECMAScript.). It's replacement for the existing syntax of Regular Expressions and tries to build upon that a better language so  developers can do more powerful stuff while having less pain.

![Kary Orchestra Editor View](https://user-images.githubusercontent.com/2157285/29429035-743f7674-83a4-11e7-890e-ca54519a792d.png)

We also made Orchestra for ourselves in the first place which means we wanted it to be the best tool possible, therefore we added every feature that we thought is helpful and every tool we used in our production. We don't want people to be forced to do something in Orchestra and then configure the rest of their tools to work with the result, Orchestra is designed so that you do something and use it in production, nothing in between. All the popular tools for RegExp like [RegExr](http://regexr.com), [RegExpU](https://github.com/mathiasbynens/regexpu), [Babel](https://babeljs.io) and [Regulex](https://jex.im/regulex/#!embed=false&flags=&re=%5E(a%7Cb)*%3F%24) are integrated into Orchestra or we have made Orchestra in a way that you no longer need them. So all you have to do is to make the edit and use the compiled regexp in production.

## Features
### Orchestra Language
It's a truly new language that gives you all sorts of possibilities and features you want from a powerful regular expression system.

- __Readability__<br> The wildcard syntax of Regular Expression engines are very problematic when it comes to their readability. Orchestra solves this problem by introducing a new syntax that is visual, very readable and maintainable while still is fast to write.

- __Scalability__<br> Orchestra is capable of writing very large regular expressions. With that, you can write scalable and maintainable regular expressions suited for doing a large task. You can now use RegExps for a task like data mining, parser writing and so on...

- __Safe & Optimized Compilation__<br> Orchestra compiles to optimized and safe RegExp. It takes care of escapes and Unicode text encodings. You can have things like Emojies in your phrases and it'll work! Orchestra's Compiler also embraces [RegExpU](https://github.com/mathiasbynens/regexpu) (the RegExp to ES5 transformer used inside of Babel) so you can be sure that what you compile will work everywhere.

- __Higher Level Language__ `Coming in Version 2`<br> Within the second release you can expect to have variables, functions, modules, and libraries in Orchestra. It will truly change the face of regular expressions by giving you the tools to write really powerful RegExes. With that, you should be expecting many new applications for regular expressions to be used in.

### Orchestra Studio
Orchestra Studio is the IDE for Orchestra Language. As Orchestra is a visual language it's IDE and Language Core are very much together and it's very hard for Orchestra Language to exists outside of the Orchestra Studio. Because of that, we tried to make Orchestra Studio the best IDE for developing regular expressions possible. It features:

- __Great Editor for Orchestra__<br>There really can't be any better IDE for Orchestra possible. It compiles Orchestra codes as you change to edit and when you select an Orchestra block it highlights the matching part in the compiled RegExps so that you can see what you change are.

- __Importing RegExps__<br>By using Kary Foundation's [Concerto Compiler](https://github.com/karyfoundation/concerto), Orchestra Studio is capable of importing any RegExp code and convert it to an optimized and greatly formatted Orchestra code. So you can import and edit any of your existing RegExps.

- __Great Debugging with Playgrounds__<br>Orchestra Studio lets you define a sample "testing text" and many quick tests in your Orchestra project and each time you change your Orchestra code you can instantly view how it executed on your samples and what it did find there. We designed playground with all the benefits you might have in [RegExr](http://regexr.com) (match highlights, hover on match to get information) and what's even better is that your playground texts also get saved within the Orchestra file, therefore, each time you open your file your tests get loaded and you can check your work as you make changes.

- __Test Cases__ `Coming in Version 2`<br> With this feature you'll be able to define tests to say if a certain text must be matched or must be rejected and also what the match groups must contain and hence each time you make changes you'll see if your changes have broken any tests... (by each single change...)

- __Best Documentations__<br> Orchestra comes with an offline documentation for Orchestra Language and is integrated right into the Orchestra Language. You can right click on any block and select 'help' to view the block's full documentation.

- __RegExp Visualizations__ `Coming in Version 2`<br>Orchestra Studio visualizes your resulting RegExp sequence and lets you walk through the matching phases using [Regulex](https://jex.im/regulex/#!embed=false&flags=&re=%5E(a%7Cb)*%3F%24). If you use `Unsafe Wildcard` feature in your Orchestra's that is going to be the best way to see how you have changed your code.

- __Great IDE__<br> Orchestra is a beautiful IDE. It contains the perfection that Kary Foundation software share. Beautiful UI and easy UX makes it easy-to-use and enjoyable to spend-time-in. It has night/light modes so you can work at any time in the day. It also is cross-platform and runs on macOS, Linux and Window systems.

## Big Disclaimer
Currently, we are working on a prototype version of Orchestra trying to find out the best shape for the software so some parts of the source code are not as pretty as they should be and our commits aren't the best commits one can make. Also, there might be buttons with no functionality or empty parts which you can expect from a work in the heavy development phase. For software in this phase, people mostly commit in private and make it public once it's ready. We believe in transparent development so we make this phase publicly visible but you have to be aware of what is the status of the repo. As we hit the first beta release this all will be over and you'll have a stable repo.

<br />
<a href="http://www.karyfoundation.org/">
    <img src="http://www.karyfoundation.org/foundation/logo/github-full-horse.png" width="250"/>
</a>
