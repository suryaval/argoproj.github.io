webpackJsonp([58974687958520],{516:function(e,n){e.exports={pathContext:{docHtml:'<h1>Ingress Configuration</h1>\n<p>ArgoCD runs both a gRPC server (used by the CLI), as well as a HTTP/HTTPS server (used by the UI).\nBoth protocols are exposed by the argocd-service on the following ports:</p>\n<ul>\n<li>443 - gRPC/HTTPS</li>\n<li>80 - HTTP (redirects to HTTPS)</li>\n</ul>\n<p>There are several ways how Ingress can be configured.</p>\n<h2><a href="https://github.com/kubernetes/ingress-nginx">kubernetes/ingress-nginx</a></h2>\n<h3>Option 1: ssl-passthrough</h3>\n<p>Because multiple protocols (gRPC/HTTPS) are being served on the same port (443), this provides a\nchallenge when attempting to define a single nginx ingress object and rule for the argocd-service,\nsince the <code>nginx.ingress.kubernetes.io/backend-protocol</code> <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#backend-protocol">annotation</a>\naccepts only a single value for the backend protocol (e.g. HTTP, HTTPS, GRPC, GRPCS).</p>\n<p>In order to expose the ArgoCD API server with a single ingress rule and hostname, the\n<code>nginx.ingress.kubernetes.io/ssl-passthrough</code> <a href="https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/#ssl-passthrough">annotation</a>\nmust be used to passthrough TLS connections and terminate TLS at the ArgoCD API server.</p>\n<pre><code class="language-yaml">apiVersion: extensions/v1beta1\nkind: Ingress\nmetadata:\n  name: argocd-server-ingress\n  annotations:\n    kubernetes.io/ingress.class: nginx\n    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"\n    nginx.ingress.kubernetes.io/ssl-passthrough: "true"\nspec:\n  rules:\n  - host: argocd.example.com\n    http:\n      paths:\n      - backend:\n          serviceName: argocd-server\n          servicePort: https\n</code></pre>\n<p>The above rule terminates TLS at the ArgoCD API server, which detects the protocol being used,\nand responds appropriately. Note that the <code>nginx.ingress.kubernetes.io/ssl-passthrough</code> annotation\nrequires that the <code>--enable-ssl-passthrough</code> flag be added to the command line arguments to\n<code>nginx-ingress-controller</code>.</p>\n<h3>Option 2: Multiple ingress objects and hosts</h3>\n<p>Since ingress-nginx Ingress supports pm;u a single protocol per Ingress object, an alternative\nway would be to define two Ingress objects. One for HTTP/HTTPS, and the other for gRPC:</p>\n<p>HTTP/HTTPS Ingress:</p>\n<pre><code class="language-yaml">apiVersion: extensions/v1beta1\nkind: Ingress\nmetadata:\n  name: argocd-server-http-ingress\n  annotations:\n    kubernetes.io/ingress.class: "nginx"\n    nginx.ingress.kubernetes.io/force-ssl-redirect: "true"\n    nginx.ingress.kubernetes.io/backend-protocol: "HTTP"\nspec:\n  rules:\n  - http:\n      paths:\n      - backend:\n          serviceName: argocd-server\n          servicePort: http\n    host: argocd.example.com\n  tls:\n  - hosts:\n    - argocd.example.com\n    secretName: argocd-secret\n</code></pre>\n<p>gRPC Ingress:</p>\n<pre><code class="language-yaml">apiVersion: extensions/v1beta1\nkind: Ingress\nmetadata:\n  name: argocd-server-grpc-ingress\n  annotations:\n    kubernetes.io/ingress.class: "nginx"\n    nginx.ingress.kubernetes.io/backend-protocol: "GRPC"\nspec:\n  rules:\n  - http:\n      paths:\n      - backend:\n          serviceName: argocd-server\n          servicePort: https\n    host: grpc.argocd.example.com\n  tls:\n  - hosts:\n    - grpc.argocd.example.com\n    secretName: argocd-secret\n</code></pre>\n<p>The API server should then be run with TLS disabled using the <code>--insecure</code> flag.</p>\n<p>The obvious disadvantage to this approach is that this technique require two separate hostnames for\nthe API server -- one for gRPC and the other for HTTP/HTTPS. However it allow TLS termination to\nhappen at the ingress controller.</p>\n<h2>AWS Application Load Balancers (ALBs) and Classic ELB (HTTP mode)</h2>\n<p>Neither ALBs and Classic ELB in HTTP mode, do not have full support for HTTP2/gRPC which is the\nprotocol used by the <code>argocd</code> CLI. Thus, when using an AWS load balancer, either Classic ELB in\npassthrough mode is needed, or NLBs.</p>',docPath:"argo-cd/docs/ingress",proj:"argo-cd"}}}});
//# sourceMappingURL=path---docs-argo-cd-docs-ingress-html-522e47c75c5a714a8744.js.map