webpackJsonp([0x6a10c45e0eab],{513:function(e,t){e.exports={pathContext:{docHtml:"<h1>FAQ</h1>\n<h2>Why is my application still <code>OutOfSync</code> immediately after a successful Sync?</h2>\n<p>It is possible for an application to still be <code>OutOfSync</code> even immediately after a successful Sync\noperation. Some reasons for this might be:</p>\n<ul>\n<li>There may be problems in manifests themselves, which may contain extra/unknown fields from the\nactual K8s spec. These extra fields would get dropped when querying Kubernetes for the live state,\nresulting in an <code>OutOfSync</code> status indicating a missing field was detected.</li>\n<li>The sync was performed (with pruning disabled), and there are resources which need to be deleted.</li>\n<li>A mutating webhook altered the manifest after it was submitted to Kubernetes</li>\n</ul>\n<p>To debug <code>OutOfSync</code> issues, run the <code>app diff</code> command to see the differences between git and live:</p>\n<pre><code>argocd app diff APPNAME\n</code></pre>",docPath:"argo-cd/docs/faq",proj:"argo-cd"}}}});
//# sourceMappingURL=path---docs-argo-cd-docs-faq-html-f2f3275edaaeee50e4cc.js.map