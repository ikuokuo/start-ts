var a = <div>
  {["foo", "bar"].map(i => <span>{i / 2}</span>)}
</div>

// using the `preserve` option
var a = <div>
    {['foo', 'bar'].map(function (i) { return <span>{i / 2}</span>; })}
</div>
