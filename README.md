# Unhealthy does not mean dead

This demo shows the effect of using the kubernetes probes for improving
the stability of microservices in case of issues with its dependencies. 


## Description

The solution consists of 2 services running in the kubernetes cluster. One
is named Patient, it is calling it's dependency named HttpBin (because it is, well,
[HttpBin](https://httpbin.org/)). Patient is an [one file](./src/Patient/Program.cs)
.NET web service.

[Istio](https://istio.io/) is used to simulate networking issues (50% chance of 100 second delays
in calls between Patient and HttpBin). To add Istio to your cluster follow
[the official documentation](https://istio.io/latest/docs/setup/).

[k6](https://k6.io/) generates load to the service. Check the [test script](./scripts/perf-test.js) 
for details. 

## How to...

Below are instructions for various cases. 

## How to choose the scenario

Use git tags:

- *all-ok*: a default configuration (everything work at its max capabilities);
- *delays-no-probes*: 50% Patient -> HttpBin calls are delayed for 100 seconds; 
- *delays-liveness-probe*: same as above, but liveness probe is active;
- *delays-readiness-probe*: same as above, but readiness probe is active;

## How to apply configuration to the cluster

```
kubectl apply -f ./k8s-manifest.yaml
```

## How to run the test

```
export TEST_URL=http://your-service.url; ./run-test.sh
```

