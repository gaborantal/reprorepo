var foo = !!!bar;

var foo = !!bar ? baz : bat;

var foo = Boolean(!!bar);

var foo = new Boolean(!!bar);

if (!!foo) {
    // ...
}

while (!!foo) {
    // ...
}

do {
    // ...
} while (!!foo);

for (; !!foo; ) {
    // ...
}
