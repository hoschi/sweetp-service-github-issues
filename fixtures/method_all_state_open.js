var nock = require('nock');

nock('http://localhost:8800')
    .get('/services/test-github-issues/password/manager/get?key=github')
    .reply(200, {
        "target": "/services/test-github-issues/password/manager/get",
        "query": "key=github",
        "service": {
            "username": "foo",
            "password": "foo"
        }
    }, {
        'content-type': 'application/json;charset=utf-8',
        'content-length': '172',
        server: 'Jetty(7.4.2.v20110526)'
    });


nock('https://api.github.com:443')
    .get('/repos/sweetp/dashboard/issues?state=open')
    .reply(200, [{
        "url": "https://api.github.com/repos/sweetp/dashboard/issues/32",
        "labels_url": "https://api.github.com/repos/sweetp/dashboard/issues/32/labels{/name}",
        "comments_url": "https://api.github.com/repos/sweetp/dashboard/issues/32/comments",
        "events_url": "https://api.github.com/repos/sweetp/dashboard/issues/32/events",
        "html_url": "https://github.com/sweetp/dashboard/issues/32",
        "id": 35300190,
        "number": 32,
        "title": "add UI settings",
        "user": {
            "login": "hoschi",
            "id": 163128,
            "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
            "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
            "url": "https://api.github.com/users/hoschi",
            "html_url": "https://github.com/hoschi",
            "followers_url": "https://api.github.com/users/hoschi/followers",
            "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
            "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
            "organizations_url": "https://api.github.com/users/hoschi/orgs",
            "repos_url": "https://api.github.com/users/hoschi/repos",
            "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/hoschi/received_events",
            "type": "User",
            "site_admin": false
        },
        "labels": [{
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/backlog",
            "name": "backlog",
            "color": "5319e7"
        }, {
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/imported",
            "name": "imported",
            "color": "fef2c0"
        }],
        "state": "open",
        "assignee": null,
        "milestone": null,
        "comments": 0,
        "created_at": "2014-06-09T16:32:22Z",
        "updated_at": "2014-06-14T16:03:22Z",
        "closed_at": null,
        "pull_request": {
            "url": null,
            "html_url": null,
            "diff_url": null,
            "patch_url": null
        },
        "body": "Add \"UI\" settings in sweetp project config file:\r\n* branch colors: Map with regex as map-key and '#aabbcc' color value\r\n  as map-value → color branch label in sweetp dashboard with this color.\r\n  This would enable the user to give feature/release/... branches different colors\r\n"
    }, {
        "url": "https://api.github.com/repos/sweetp/dashboard/issues/31",
        "labels_url": "https://api.github.com/repos/sweetp/dashboard/issues/31/labels{/name}",
        "comments_url": "https://api.github.com/repos/sweetp/dashboard/issues/31/comments",
        "events_url": "https://api.github.com/repos/sweetp/dashboard/issues/31/events",
        "html_url": "https://github.com/sweetp/dashboard/issues/31",
        "id": 35299857,
        "number": 31,
        "title": "Add more status widgets",
        "user": {
            "login": "hoschi",
            "id": 163128,
            "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
            "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
            "url": "https://api.github.com/users/hoschi",
            "html_url": "https://github.com/hoschi",
            "followers_url": "https://api.github.com/users/hoschi/followers",
            "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
            "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
            "organizations_url": "https://api.github.com/users/hoschi/orgs",
            "repos_url": "https://api.github.com/users/hoschi/repos",
            "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/hoschi/received_events",
            "type": "User",
            "site_admin": false
        },
        "labels": [{
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/backlog",
            "name": "backlog",
            "color": "5319e7"
        }, {
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/imported",
            "name": "imported",
            "color": "fef2c0"
        }],
        "state": "open",
        "assignee": null,
        "milestone": null,
        "comments": 0,
        "created_at": "2014-06-09T16:29:02Z",
        "updated_at": "2014-06-14T16:03:22Z",
        "closed_at": null,
        "pull_request": {
            "url": null,
            "html_url": null,
            "diff_url": null,
            "patch_url": null
        },
        "body": "code climate, travics, ..."
    }, {
        "url": "https://api.github.com/repos/sweetp/dashboard/issues/30",
        "labels_url": "https://api.github.com/repos/sweetp/dashboard/issues/30/labels{/name}",
        "comments_url": "https://api.github.com/repos/sweetp/dashboard/issues/30/comments",
        "events_url": "https://api.github.com/repos/sweetp/dashboard/issues/30/events",
        "html_url": "https://github.com/sweetp/dashboard/issues/30",
        "id": 35299769,
        "number": 30,
        "title": "better ticket workflow?!",
        "user": {
            "login": "hoschi",
            "id": 163128,
            "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
            "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
            "url": "https://api.github.com/users/hoschi",
            "html_url": "https://github.com/hoschi",
            "followers_url": "https://api.github.com/users/hoschi/followers",
            "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
            "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
            "organizations_url": "https://api.github.com/users/hoschi/orgs",
            "repos_url": "https://api.github.com/users/hoschi/repos",
            "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/hoschi/received_events",
            "type": "User",
            "site_admin": false
        },
        "labels": [{
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/imported",
            "name": "imported",
            "color": "fef2c0"
        }],
        "state": "open",
        "assignee": {
            "login": "hoschi",
            "id": 163128,
            "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
            "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
            "url": "https://api.github.com/users/hoschi",
            "html_url": "https://github.com/hoschi",
            "followers_url": "https://api.github.com/users/hoschi/followers",
            "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
            "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
            "organizations_url": "https://api.github.com/users/hoschi/orgs",
            "repos_url": "https://api.github.com/users/hoschi/repos",
            "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/hoschi/received_events",
            "type": "User",
            "site_admin": false
        },
        "milestone": {
            "url": "https://api.github.com/repos/sweetp/dashboard/milestones/4",
            "labels_url": "https://api.github.com/repos/sweetp/dashboard/milestones/4/labels",
            "id": 691136,
            "number": 4,
            "title": "0.1.3",
            "description": "",
            "creator": {
                "login": "hoschi",
                "id": 163128,
                "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
                "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
                "url": "https://api.github.com/users/hoschi",
                "html_url": "https://github.com/hoschi",
                "followers_url": "https://api.github.com/users/hoschi/followers",
                "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
                "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
                "organizations_url": "https://api.github.com/users/hoschi/orgs",
                "repos_url": "https://api.github.com/users/hoschi/repos",
                "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
                "received_events_url": "https://api.github.com/users/hoschi/received_events",
                "type": "User",
                "site_admin": false
            },
            "open_issues": 2,
            "closed_issues": 0,
            "state": "open",
            "created_at": "2014-06-14T16:01:16Z",
            "updated_at": "2014-06-14T16:01:42Z",
            "due_on": null
        },
        "comments": 0,
        "created_at": "2014-06-09T16:28:07Z",
        "updated_at": "2014-07-12T19:22:44Z",
        "closed_at": null,
        "pull_request": {
            "url": null,
            "html_url": null,
            "diff_url": null,
            "patch_url": null
        },
        "body": "Use e.g. 'waffle.io'/'hboard.com' for easier ticket workflow?"
    }, {
        "url": "https://api.github.com/repos/sweetp/dashboard/issues/29",
        "labels_url": "https://api.github.com/repos/sweetp/dashboard/issues/29/labels{/name}",
        "comments_url": "https://api.github.com/repos/sweetp/dashboard/issues/29/comments",
        "events_url": "https://api.github.com/repos/sweetp/dashboard/issues/29/events",
        "html_url": "https://github.com/sweetp/dashboard/issues/29",
        "id": 35299734,
        "number": 29,
        "title": "setup continuous integration",
        "user": {
            "login": "hoschi",
            "id": 163128,
            "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
            "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
            "url": "https://api.github.com/users/hoschi",
            "html_url": "https://github.com/hoschi",
            "followers_url": "https://api.github.com/users/hoschi/followers",
            "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
            "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
            "organizations_url": "https://api.github.com/users/hoschi/orgs",
            "repos_url": "https://api.github.com/users/hoschi/repos",
            "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/hoschi/received_events",
            "type": "User",
            "site_admin": false
        },
        "labels": [{
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/imported",
            "name": "imported",
            "color": "fef2c0"
        }],
        "state": "open",
        "assignee": null,
        "milestone": {
            "url": "https://api.github.com/repos/sweetp/dashboard/milestones/4",
            "labels_url": "https://api.github.com/repos/sweetp/dashboard/milestones/4/labels",
            "id": 691136,
            "number": 4,
            "title": "0.1.3",
            "description": "",
            "creator": {
                "login": "hoschi",
                "id": 163128,
                "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
                "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
                "url": "https://api.github.com/users/hoschi",
                "html_url": "https://github.com/hoschi",
                "followers_url": "https://api.github.com/users/hoschi/followers",
                "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
                "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
                "organizations_url": "https://api.github.com/users/hoschi/orgs",
                "repos_url": "https://api.github.com/users/hoschi/repos",
                "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
                "received_events_url": "https://api.github.com/users/hoschi/received_events",
                "type": "User",
                "site_admin": false
            },
            "open_issues": 2,
            "closed_issues": 0,
            "state": "open",
            "created_at": "2014-06-14T16:01:16Z",
            "updated_at": "2014-06-14T16:01:42Z",
            "due_on": null
        },
        "comments": 0,
        "created_at": "2014-06-09T16:27:40Z",
        "updated_at": "2014-06-14T16:01:42Z",
        "closed_at": null,
        "pull_request": {
            "url": null,
            "html_url": null,
            "diff_url": null,
            "patch_url": null
        },
        "body": "Travis/CodeShip?! Generate `lcov` code coverage for [coveralls](https://coveralls.io/r/sweetp/dashboard)\r\n\r\nAlso run karma tests in chrome through 'sauce labs', also free for open source projects.\r\n"
    }, {
        "url": "https://api.github.com/repos/sweetp/dashboard/issues/25",
        "labels_url": "https://api.github.com/repos/sweetp/dashboard/issues/25/labels{/name}",
        "comments_url": "https://api.github.com/repos/sweetp/dashboard/issues/25/comments",
        "events_url": "https://api.github.com/repos/sweetp/dashboard/issues/25/events",
        "html_url": "https://github.com/sweetp/dashboard/issues/25",
        "id": 35299434,
        "number": 25,
        "title": "better widget classes",
        "user": {
            "login": "hoschi",
            "id": 163128,
            "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
            "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
            "url": "https://api.github.com/users/hoschi",
            "html_url": "https://github.com/hoschi",
            "followers_url": "https://api.github.com/users/hoschi/followers",
            "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
            "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
            "organizations_url": "https://api.github.com/users/hoschi/orgs",
            "repos_url": "https://api.github.com/users/hoschi/repos",
            "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/hoschi/received_events",
            "type": "User",
            "site_admin": false
        },
        "labels": [{
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/backlog",
            "name": "backlog",
            "color": "5319e7"
        }, {
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/imported",
            "name": "imported",
            "color": "fef2c0"
        }],
        "state": "open",
        "assignee": null,
        "milestone": null,
        "comments": 0,
        "created_at": "2014-06-09T16:24:24Z",
        "updated_at": "2014-06-14T16:03:22Z",
        "closed_at": null,
        "pull_request": {
            "url": null,
            "html_url": null,
            "diff_url": null,
            "patch_url": null
        },
        "body": "Widget directive only adds a class name so all widgets can be styled\r\neasily. But this adds an additional nesting level to the DOM. Try to\r\nprevent this. E.g. make widget directive restrict to 'A' instead of\r\n'E'. Or make a JS class which can decorate an element with the class\r\nname.\r\n"
    }, {
        "url": "https://api.github.com/repos/sweetp/dashboard/issues/23",
        "labels_url": "https://api.github.com/repos/sweetp/dashboard/issues/23/labels{/name}",
        "comments_url": "https://api.github.com/repos/sweetp/dashboard/issues/23/comments",
        "events_url": "https://api.github.com/repos/sweetp/dashboard/issues/23/events",
        "html_url": "https://github.com/sweetp/dashboard/issues/23",
        "id": 35299313,
        "number": 23,
        "title": "commits count for release",
        "user": {
            "login": "hoschi",
            "id": 163128,
            "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
            "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
            "url": "https://api.github.com/users/hoschi",
            "html_url": "https://github.com/hoschi",
            "followers_url": "https://api.github.com/users/hoschi/followers",
            "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
            "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
            "organizations_url": "https://api.github.com/users/hoschi/orgs",
            "repos_url": "https://api.github.com/users/hoschi/repos",
            "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/hoschi/received_events",
            "type": "User",
            "site_admin": false
        },
        "labels": [{
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/backlog",
            "name": "backlog",
            "color": "5319e7"
        }, {
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/imported",
            "name": "imported",
            "color": "fef2c0"
        }],
        "state": "open",
        "assignee": null,
        "milestone": null,
        "comments": 0,
        "created_at": "2014-06-09T16:22:47Z",
        "updated_at": "2014-06-14T16:03:22Z",
        "closed_at": null,
        "pull_request": {
            "url": null,
            "html_url": null,
            "diff_url": null,
            "patch_url": null
        },
        "body": "Add widget to list number of commits not released yet. This are the\r\ncommits between the 'release' branch and the 'develop' branch.\r\nScmEnhacer config lists which branches are the develop and the\r\nrelease branch. Put this widget into project view, not commit view.\r\n                                                                      \r\nNote: A more major version would show also which tickets in between\r\nthese branches. Also it would be nice to see which commits going into\r\na release which have no ticket attached.\r\n"
    }, {
        "url": "https://api.github.com/repos/sweetp/dashboard/issues/21",
        "labels_url": "https://api.github.com/repos/sweetp/dashboard/issues/21/labels{/name}",
        "comments_url": "https://api.github.com/repos/sweetp/dashboard/issues/21/comments",
        "events_url": "https://api.github.com/repos/sweetp/dashboard/issues/21/events",
        "html_url": "https://github.com/sweetp/dashboard/issues/21",
        "id": 35299218,
        "number": 21,
        "title": "fix closing windows",
        "user": {
            "login": "hoschi",
            "id": 163128,
            "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
            "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
            "url": "https://api.github.com/users/hoschi",
            "html_url": "https://github.com/hoschi",
            "followers_url": "https://api.github.com/users/hoschi/followers",
            "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
            "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
            "organizations_url": "https://api.github.com/users/hoschi/orgs",
            "repos_url": "https://api.github.com/users/hoschi/repos",
            "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/hoschi/received_events",
            "type": "User",
            "site_admin": false
        },
        "labels": [{
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/backlog",
            "name": "backlog",
            "color": "5319e7"
        }, {
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/imported",
            "name": "imported",
            "color": "fef2c0"
        }],
        "state": "open",
        "assignee": null,
        "milestone": null,
        "comments": 0,
        "created_at": "2014-06-09T16:21:29Z",
        "updated_at": "2014-06-14T16:03:22Z",
        "closed_at": null,
        "pull_request": {
            "url": null,
            "html_url": null,
            "diff_url": null,
            "patch_url": null
        },
        "body": "When user closes main window, all main windows are closed. Only close\r\nthe main window closed by user and its child windows, not *all*\r\nwindows.\r\n"
    }, {
        "url": "https://api.github.com/repos/sweetp/dashboard/issues/16",
        "labels_url": "https://api.github.com/repos/sweetp/dashboard/issues/16/labels{/name}",
        "comments_url": "https://api.github.com/repos/sweetp/dashboard/issues/16/comments",
        "events_url": "https://api.github.com/repos/sweetp/dashboard/issues/16/events",
        "html_url": "https://github.com/sweetp/dashboard/issues/16",
        "id": 35298939,
        "number": 16,
        "title": "use chrome messaging for global app event",
        "user": {
            "login": "hoschi",
            "id": 163128,
            "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
            "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
            "url": "https://api.github.com/users/hoschi",
            "html_url": "https://github.com/hoschi",
            "followers_url": "https://api.github.com/users/hoschi/followers",
            "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
            "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
            "organizations_url": "https://api.github.com/users/hoschi/orgs",
            "repos_url": "https://api.github.com/users/hoschi/repos",
            "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/hoschi/received_events",
            "type": "User",
            "site_admin": false
        },
        "labels": [{
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/backlog",
            "name": "backlog",
            "color": "5319e7"
        }, {
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/imported",
            "name": "imported",
            "color": "fef2c0"
        }],
        "state": "open",
        "assignee": null,
        "milestone": null,
        "comments": 0,
        "created_at": "2014-06-09T16:18:03Z",
        "updated_at": "2014-06-14T16:03:22Z",
        "closed_at": null,
        "pull_request": {
            "url": null,
            "html_url": null,
            "diff_url": null,
            "patch_url": null
        },
        "body": "All angular services are created again when a window opens. This is\r\nunpreventable because this is a new HTML page and all ressources are\r\nadded again to that page. So the AppSettings 'save' event of the main\r\nwindow can't reach the second window. They have both its own\r\nAppSettings singleton.\r\n                                                                      \r\nUse background page messages to handle this accross content windows.\r\n"
    }, {
        "url": "https://api.github.com/repos/sweetp/dashboard/issues/11",
        "labels_url": "https://api.github.com/repos/sweetp/dashboard/issues/11/labels{/name}",
        "comments_url": "https://api.github.com/repos/sweetp/dashboard/issues/11/comments",
        "events_url": "https://api.github.com/repos/sweetp/dashboard/issues/11/events",
        "html_url": "https://github.com/sweetp/dashboard/issues/11",
        "id": 35298648,
        "number": 11,
        "title": "stored passwords list widget",
        "user": {
            "login": "hoschi",
            "id": 163128,
            "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
            "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
            "url": "https://api.github.com/users/hoschi",
            "html_url": "https://github.com/hoschi",
            "followers_url": "https://api.github.com/users/hoschi/followers",
            "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
            "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
            "organizations_url": "https://api.github.com/users/hoschi/orgs",
            "repos_url": "https://api.github.com/users/hoschi/repos",
            "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/hoschi/received_events",
            "type": "User",
            "site_admin": false
        },
        "labels": [{
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/backlog",
            "name": "backlog",
            "color": "5319e7"
        }, {
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/imported",
            "name": "imported",
            "color": "fef2c0"
        }],
        "state": "open",
        "assignee": null,
        "milestone": null,
        "comments": 0,
        "created_at": "2014-06-09T16:14:27Z",
        "updated_at": "2014-06-14T16:03:22Z",
        "closed_at": null,
        "pull_request": {
            "url": null,
            "html_url": null,
            "diff_url": null,
            "patch_url": null
        },
        "body": "Add widget to show a list of passwords stored in password safe if\r\nexisting. Add button for each key to get username/password. When\r\ncredentials retrieved, show buttons to put username or password into\r\nclipboard. (Use service to put into clipboard? or use chrome API? )\r\n                                                                     \r\nShow info message when user isn't authenticated yet and a button to\r\nrun authentication (java UI is ok for now? ).\r\n"
    }, {
        "url": "https://api.github.com/repos/sweetp/dashboard/issues/10",
        "labels_url": "https://api.github.com/repos/sweetp/dashboard/issues/10/labels{/name}",
        "comments_url": "https://api.github.com/repos/sweetp/dashboard/issues/10/comments",
        "events_url": "https://api.github.com/repos/sweetp/dashboard/issues/10/events",
        "html_url": "https://github.com/sweetp/dashboard/issues/10",
        "id": 35298592,
        "number": 10,
        "title": "Refactor refresh buttons of overview and project view to directive",
        "user": {
            "login": "hoschi",
            "id": 163128,
            "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
            "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
            "url": "https://api.github.com/users/hoschi",
            "html_url": "https://github.com/hoschi",
            "followers_url": "https://api.github.com/users/hoschi/followers",
            "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
            "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
            "organizations_url": "https://api.github.com/users/hoschi/orgs",
            "repos_url": "https://api.github.com/users/hoschi/repos",
            "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/hoschi/received_events",
            "type": "User",
            "site_admin": false
        },
        "labels": [{
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/backlog",
            "name": "backlog",
            "color": "5319e7"
        }, {
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/imported",
            "name": "imported",
            "color": "fef2c0"
        }],
        "state": "open",
        "assignee": null,
        "milestone": null,
        "comments": 0,
        "created_at": "2014-06-09T16:13:46Z",
        "updated_at": "2014-06-14T16:03:22Z",
        "closed_at": null,
        "pull_request": {
            "url": null,
            "html_url": null,
            "diff_url": null,
            "patch_url": null
        },
        "body": ""
    }, {
        "url": "https://api.github.com/repos/sweetp/dashboard/issues/8",
        "labels_url": "https://api.github.com/repos/sweetp/dashboard/issues/8/labels{/name}",
        "comments_url": "https://api.github.com/repos/sweetp/dashboard/issues/8/comments",
        "events_url": "https://api.github.com/repos/sweetp/dashboard/issues/8/events",
        "html_url": "https://github.com/sweetp/dashboard/issues/8",
        "id": 35298384,
        "number": 8,
        "title": "last opened project",
        "user": {
            "login": "hoschi",
            "id": 163128,
            "avatar_url": "https://avatars.githubusercontent.com/u/163128?",
            "gravatar_id": "362bc5adb9fbcbb4baa5ed34cf166059",
            "url": "https://api.github.com/users/hoschi",
            "html_url": "https://github.com/hoschi",
            "followers_url": "https://api.github.com/users/hoschi/followers",
            "following_url": "https://api.github.com/users/hoschi/following{/other_user}",
            "gists_url": "https://api.github.com/users/hoschi/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/hoschi/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/hoschi/subscriptions",
            "organizations_url": "https://api.github.com/users/hoschi/orgs",
            "repos_url": "https://api.github.com/users/hoschi/repos",
            "events_url": "https://api.github.com/users/hoschi/events{/privacy}",
            "received_events_url": "https://api.github.com/users/hoschi/received_events",
            "type": "User",
            "site_admin": false
        },
        "labels": [{
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/backlog",
            "name": "backlog",
            "color": "5319e7"
        }, {
            "url": "https://api.github.com/repos/sweetp/dashboard/labels/imported",
            "name": "imported",
            "color": "fef2c0"
        }],
        "state": "open",
        "assignee": null,
        "milestone": null,
        "comments": 0,
        "created_at": "2014-06-09T16:11:47Z",
        "updated_at": "2014-06-14T16:03:22Z",
        "closed_at": null,
        "pull_request": {
            "url": null,
            "html_url": null,
            "diff_url": null,
            "patch_url": null
        },
        "body": "Save last opened project on exit and open this project on startup.\r\nWhen there is no last project, show overview page.\r\nWhen last project was removed, show overview page.\r\nWhen projects are loaded in project controller, user can't switch to overview view because projects loading twice.\r\n"
    }], {
        server: 'GitHub.com',
        date: 'Tue, 29 Jul 2014 10:29:04 GMT',
        'content-type': 'application/json; charset=utf-8',
        status: '200 OK',
        'x-ratelimit-limit': '5000',
        'x-ratelimit-remaining': '4993',
        'x-ratelimit-reset': '1406633207',
        'cache-control': 'private, max-age=60, s-maxage=60',
        etag: '"52adc9f66a4837695d5b28360d08fab5"',
        vary: 'Accept, Authorization, Cookie, X-GitHub-OTP',
        'x-github-media-type': 'github.beta; format=json',
        'x-xss-protection': '1; mode=block',
        'x-frame-options': 'deny',
        'content-security-policy': 'default-src \'none\'',
        'content-length': '25445',
        'access-control-allow-credentials': 'true',
        'access-control-expose-headers': 'ETag, Link, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval',
        'access-control-allow-origin': '*',
        'x-github-request-id': '1F112D86:223F:83B8978:53D7776F',
        'strict-transport-security': 'max-age=31536000; includeSubdomains',
        'x-content-type-options': 'nosniff',
        'x-served-by': 'a8d8e492d6966f0c23dee2eed64c678a'
    });
