var CFDG = CFDG || {};
CFDG.examples = [];

CFDG.examples.push({
  'title': 'ciliasun',
  'code': 'startshape SUN\n' +
    '\n' +
    'shape SUN\n' +
    '{\n' +
    '	loop 72 [r 5]\n' +
    '		LINER(-3…3) [y 5 sat 1 b 0.3]\n' +
    '}\n' +
    '\n' +
    'shape LINER(number angle)\n' +
    'rule {\n' +
    '	UTRIANGLE [y 0.5 s 0.86 r 0.5]\n' +
    '	LINER(=) [r angle b 0.1 hue 0.1 60 \n' +
    '		y 0.75 x 0.4330125 s 0.97]\n' +
    '}\n' +
    'rule .1 { \n' +
    '	LINER(-3…3) []\n' +
    '}\n' +
    '\n' +
    'path UTRIANGLE {\n' +
    '	MOVETO(0, -0.5)\n' +
    '	loop 3 [r 120] {\n' +
    '		CURVEREL(\n' +
    '			0.25, sqrt(3)/4,\n' +
    '			-0.05, 0.025,\n' +
    '			0, sqrt(3)/8\n' +
    '		)\n' +
    '		CURVEREL(\n' +
    '			0.25, sqrt(3)/4,\n' +
    '			0.25 + 0.025, sqrt(3)/4 - 0.025,\n' +
    '			CF::Continuous\n' +
    '		)\n' +
    '	}\n' +
    '	CLOSEPOLY(CF::Align)\n' +
    '	FILL[]\n' +
    '}'
});

CFDG.examples.push({
  'title': 'demo1',
  'code': 'startshape FOREST\n' +
    '\n' +
    'shape FOREST\n' +
    '{\n' +
    '     SEED []\n' +
    '     SEED [x -20]\n' +
    '     SEED [x -40]\n' +
    '}\n' +
    '\n' +
    'shape SEED\n' +
    'rule {BRANCH []}\n' +
    'rule {BRANCH [rotate 1]}\n' +
    'rule {BRANCH [rotate -1]}\n' +
    'rule {BRANCH [rotate 2]}\n' +
    'rule {BRANCH [rotate -2]}\n' +
    'rule {FORK []}\n' +
    '\n' +
    'shape BRANCH\n' +
    'rule {LEFTBRANCH [flip 90]}\n' +
    'rule {LEFTBRANCH []}\n' +
    '\n' +
    'shape LEFTBRANCH\n' +
    'rule 4 {BLOCK [] LEFTBRANCH [y 0.885 rotate 0.1 size 0.99]}\n' +
    'rule 4 {BLOCK [] LEFTBRANCH [y 0.885 rotate 0.2 size 0.99]}\n' +
    'rule {BLOCK [] LEFTBRANCH [y 0.885 rotate 4 size 0.99]}\n' +
    'rule {BLOCK [] FORK []}\n' +
    '\n' +
    '\n' +
    'shape BLOCK\n' +
    '{\n' +
    '     SQUARE [rotate 1]\n' +
    '     SQUARE [rotate -1]\n' +
    '     SQUARE []\n' +
    '}\n' +
    '\n' +
    'shape FORK\n' +
    'rule {\n' +
    '     BRANCH [ ]\n' +
    '     BRANCH [size 0.5 rotate 40]\n' +
    '}\n' +
    'rule {\n' +
    '     BRANCH [ ]\n' +
    '     BRANCH [size 0.5 rotate -40]\n' +
    '}\n' +
    'rule {\n' +
    '     BRANCH [size 0.5 rotate -20]\n' +
    '     BRANCH [ ]\n' +
    '}\n' +
    'rule {\n' +
    '     BRANCH [size 0.7 y 0.1 rotate 20]\n' +
    '     BRANCH [size 0.7 y 0.1 rotate -20]\n' +
    '}'
});

CFDG.examples.push({
  'title': 'tangle',
  'code': 'startshape SPIKES\n' +
    '\n' +
    'shape SPIKES\n' +
    '{\n' +
    '	loop 4 [r 90] SPIKE []\n' +
    '}\n' +
    '\n' +
    'shape SPIKE\n' +
    'rule {\n' +
    '	LSPIKE []\n' +
    '}\n' +
    'rule {\n' +
    '	LSPIKE [ flip 90 ]\n' +
    '}\n' +
    '\n' +
    'shape LSPIKE\n' +
    'rule {\n' +
    '	SQUARE []\n' +
    '	LSPIKE [ y 0.98 s 0.99 r 1]\n' +
    '}\n' +
    'rule 0.01 {\n' +
    '	SPIKE [ r 90 ]\n' +
    '	SPIKE [ r -90 ]\n' +
    '	LSPIKE [ y 0.98 s 0.99  r 1]\n' +
    '}\n'
});

CFDG.examples.push({
  'title': 'triples',
  'code': 'startshape TRIPLES\n' +
    '\n' +
    'shape TRIPLES\n' +
    '{\n' +
    '	LINES [ r 0 ]\n' +
    '	LINES [ r 120 ]\n' +
    '	LINES [ r -120 ]\n' +
    '}	\n' +
    '\n' +
    'shape LINES\n' +
    '{\n' +
    '	UTRIANGLE [ y 0.5 ]\n' +
    '	LINES [ r 20 b 0.15 y 0.75 x -0.4330125  s 0.754877 ]\n' +
    '	LINER [ r -60 b 0.15 y 0.75 x 0.4330125  s 0.754877 ]\n' +
    '}\n' +
    '\n' +
    'shape LINER\n' +
    '{\n' +
    '	UTRIANGLE [ y 0.5 ]\n' +
    '	LINER [ r -15…-6 b 0.02\n' +
    '		y 0.75 x 0.4330125  s 0.754877 ]\n' +
    '}\n' +
    '\n' +
    '// 0.754877 is the solution to\n' +
    '// x^2 + x^3 = 1\n' +
    '// this allows double backed\n' +
    '// triangles to exactly line up!\n' +
    '\n' +
    '\n' +
    'shape TESTU\n' +
    '{\n' +
    '	TESTU_background [ ]\n' +
    '	UTRIANGLE [ ]\n' +
    '	UTRIANGLE [ y 0.5 x -0.866025 b 0.5 r 60 ]\n' +
    '	UTRIANGLE [ y 0.5 x +0.866025 b 0.5 r 60 ]\n' +
    '}\n' +
    'shape TESTU_background\n' +
    '{\n' +
    '	CIRCLE [  b 0.5 ]\n' +
    '	CIRCLE  [ y -1 ]\n' +
    '	CIRCLE [ y -0.5 x -0.866025 ]\n' +
    '	CIRCLE [ y -0.5 x 0.866025 ]\n' +
    '	CIRCLE [ y 0.5 x -0.866025 ]\n' +
    '	CIRCLE [ y 0.5 x 0.866025 ]\n' +
    '	CIRCLE  [ y 1 ]\n' +
    '}\n' +
    '\n' +
    'shape UTRIANGLE\n' +
    '{\n' +
    '	transform [ r 42.5 s 0.525 ] {\n' +
    '		ARM [ r 0 ]\n' +
    '		ARM [ r 120 ]\n' +
    '		ARM [ r -120 ]\n' +
    '	}\n' +
    '}\n' +
    '\n' +
    'shape ARM\n' +
    '{\n' +
    '	CIRCLE [ ]\n' +
    '	ARM [ y 0.1 s 0.9 r 2 ]\n' +
    '}\n'
});

CFDG.examples.push({
  'title': 'underground',
  'code': 'startshape MAP\n' +
    '\n' +
    'shape MAP\n' +
    '{\n' +
    '	LOGO [ ]\n' +
    '	ROUTE [ x 80 y 80 rotate 90 ]\n' +
    '}\n' +
    '\n' +
    'shape ROUTE\n' +
    'rule {\n' +
    '	LINES [ brightness 0.2 ]\n' +
    '}\n' +
    'rule {\n' +
    '	LINES [ brightness -0.2 ]\n' +
    '}\n' +
    'shape LINES\n' +
    '{\n' +
    '	LINE [ ]\n' +
    '	LINE [ rotate 180 ]\n' +
    '}\n' +
    '\n' +
    'shape LINE\n' +
    'rule 1000 {\n' +
    '	CIRCLE [ ]\n' +
    '	LINE [ y 0.1 ]\n' +
    '}\n' +
    '// turns\n' +
    'rule 1 { LINE [ rotate 45 ] }\n' +
    'rule 1 { LINE [ rotate -45 ] }\n' +
    'rule 1 { LINE [ rotate 90 ] }\n' +
    'rule 1 { LINE [ rotate -90 ] }\n' +
    '\n' +
    '// station\n' +
    'rule 4 {\n' +
    '	SQUARE [\n' +
    '		size 3\n' +
    '		rotate 45\n' +
    '	]\n' +
    '	LINE [ ]\n' +
    '}\n' +
    '\n' +
    '// interchange\n' +
    'rule 0.5 {\n' +
    '	LINE [ ]\n' +
    '	ROUTE [ rotate 90 ]\n' +
    '}\n' +
    '\n' +
    '// terminus\n' +
    'rule 1 {\n' +
    '	CIRCLE [ size 3 ]\n' +
    '	CIRCLE [ size 1\n' +
    '		brightness 1 ]\n' +
    '}\n' +
    '\n' +
    'shape LOGO\n' +
    '{\n' +
    '	CIRCLE [\n' +
    '		size 5\n' +
    '		brightness 0.5\n' +
    '	]\n' +
    '	CIRCLE [\n' +
    '		size 3.5\n' +
    '		brightness 1.0\n' +
    '	]\n' +
    '	SQUARE [ s 6 1 ]\n' +
    '}'
});

CFDG.examples.push({
  'title': 'weighting_demo',
  'code': 'startshape SEED1\n' +
    '\n' +
    'shape SEED1\n' +
    'rule {\n' +
    ' SQUARE[]\n' +
    ' SEED1 [y 1.2 size 0.99 rotate 1.5 brightness 0.03]\n' +
    '}\n' +
    '\n' +
    'rule 0.05 {SEED1 [flip 90]}\n' +
    '\n' +
    'rule 0.05 {\n' +
    ' SQUARE[]\n' +
    ' SEED1 [y 1.2 s 0.99 r 1.5 b -0.5 flip 90]\n' +
    ' SEED1 [y 1.2 x 1.2 s 0.6 r -60 b -0.5]\n' +
    ' SEED1 [y 1.2 x -1.2 s 0.5 r 60 b -0.5 flip 90]\n' +
    '}'
});

CFDG.examples.push({
  'title': 'welcome',
  'code': 'startshape WELCOME\n' +
    '\n' +
    'shape WELCOME\n' +
    '{\n' +
    '    MESSAGE [ hue 225 sat 0.7 b 0.6 ]\n' +
    '    VINEL [ sat 1 hue 120\n' +
    '        x 3 y -55\n' +
    '        r 0 b 0.5 s 10\n' +
    '    ]\n' +
    '    VINEL [ flip 90\n' +
    '        sat 1 hue 120\n' +
    '        x 85 y -55\n' +
    '        r 0 b 0.5 s 10\n' +
    '    ]\n' +
    '}\n' +
    '\n' +
    'shape MESSAGE\n' +
    '{\n' +
    '    W [ x 0 ]\n' +
    '    E [ x 12 ]\n' +
    '    L [ x 24 ]\n' +
    '    C [ x 34 ]\n' +
    '    O [ x 46 ]\n' +
    '    M [ x 64 ]\n' +
    '    E [ x 80 ]\n' +
    '}\n' +
    '\n' +
    'shape W\n' +
    '{\n' +
    '    LINE [ r -7 ]\n' +
    '    LINE [ r 7 ]\n' +
    '    LINE [ x 6 r -7 ]\n' +
    '    LINE [ x 6 r 7 ]\n' +
    '}\n' +
    '\n' +
    'shape E\n' +
    '{\n' +
    '    LINE [ s 0.9 ]\n' +
    '    LINE [ s 0.9 -1 y 24 ]\n' +
    '    LINE [ s 0.4 r -90 y 0 ]\n' +
    '    LINE [ s 0.4 r -90 y 12 ]\n' +
    '    LINE [ s 0.4 r -90 y 24 ]\n' +
    '}\n' +
    '\n' +
    'shape L\n' +
    '{\n' +
    '    LINE [ ]\n' +
    '    LINE [ s 0.4 x 0.4 r -90 y 0 ]\n' +
    '}\n' +
    '\n' +
    'shape C\n' +
    '{\n' +
    '    ARCL [ y 12 flip 90 ]\n' +
    '    ARCL [ y 12 r 180 ]\n' +
    '}\n' +
    '\n' +
    'shape O\n' +
    '{\n' +
    '    ARCL [ y 12 flip 90]\n' +
    '    ARCL [ y 12 r 180 ]\n' +
    '    ARCL [ y 12 x 14 r 180 flip 90]\n' +
    '    ARCL [ y 12 x 14 ]\n' +
    '}\n' +
    '\n' +
    'shape M\n' +
    '{\n' +
    '    LINE [ y 24 r 180 ]\n' +
    '    LINE [ y 24 r  -160 s 0.75 ]\n' +
    '    LINE [ y 24 x 12 r 160 s 0.75 ]\n' +
    '    LINE [ y 24 x 12 r 180 ]\n' +
    '}\n' +
    '\n' +
    'shape LINE\n' +
    '{\n' +
    '    TRIANGLE [[ s 1 30 y 0.26 ]]\n' +
    '    //MARK { }\n' +
    '    //LINE { size 0.98 y 0.5 }\n' +
    '}\n' +
    '\n' +
    'shape ARCL\n' +
    '{\n' +
    '    MARK [ ]\n' +
    '    ARCL [ size 0.97 y 0.55 r 1.5 ]\n' +
    '}\n' +
    '\n' +
    'shape MARK\n' +
    '{\n' +
    '    SQUARE [ ]\n' +
    '}\n' +
    '\n' +
    '\n' +
    'shape VINEL\n' +
    '{\n' +
    '    STEML [ ]\n' +
    '    STEML [ x 1 r 5 flip 0 ]\n' +
    '    VINEL [ x 2 size 0.9 r 10 ]\n' +
    '}\n' +
    '\n' +
    'shape STEML\n' +
    '{\n' +
    '    GOL [ r 20 s 0.1 ]\n' +
    '    END [ s 0.2 r 120 hue 150\n' +
    '        x 1.3 y -0.6 b -0.3]\n' +
    '}\n' +
    'shape GOL\n' +
    '{\n' +
    '    CIRCLE [ ]\n' +
    '    GOL [ x 0.3 r -1 s 0.985 ]\n' +
    '}\n' +
    '\n' +
    '\n' +
    'shape END\n' +
    '{\n' +
    '    CIRCLE [ x -0.5 y 0.0 s 1.0 ]\n' +
    '    CIRCLE [ x 0.45 y 0.6 s 0.9 ]\n' +
    '    CIRCLE [ x -0.4 y 1.2 s 0.8 ]\n' +
    '    CIRCLE [ x 0.35 y 1.8 s 0.7 ]\n' +
    '    CIRCLE [ x -0.3 y 2.4 s 0.6 ]\n' +
    '}'
});

CFDG.examples.push({
  'title': '#1647 Clovers',
  'code': '/* \n' +
    ' * http://www.contextfreeart.org/gallery/view.php?id=1647\n' +
    ' */\n' +
    'startshape main\n' +
    '\n' +
    'background {sat .3 h 200}\n' +
    '\n' +
    'rule main {\n' +
    '  CLOVER {b .2}\n' +
    '  main {z -1 s 0.8 x 4 r 100}\n' +
    '}\n' +
    '\n' +
    'rule CLOVER {\n' +
    '  CIRCLE {}\n' +
    '  CLOVER {x 1.0 s 0.99 r 90 b 0.01}\n' +
    '}'
});

CFDG.examples.push({
  'title': 'Petal logo',
  'code': '/* \n' +
    ' * https://github.com/siaflab/petal\n' +
    ' */\n' +
    'startshape p1\n' +
    'background {a -1}\n' +
    'rule p0 {CIRCLE{sat .2 b 1} p0{x -.0075 s .99}}\n' +
    'rule p1 {4 * {r 13 x .15 y -.15 sat .2 z 1} p0{}}'
});
